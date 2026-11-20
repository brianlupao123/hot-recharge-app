import { Router, Request, Response, NextFunction } from 'express';
import { hotRechargeAdapter } from '../adapters/hotRechargeV3';
import { DATA_BUNDLES, calculateZesaUnits } from '../services/mockData';
import { RechargeRequest, PaymentInitiationRequest } from '../types';
import { Database } from '../services/database';
import { zimraFiscalService } from '../services/zimraFiscal';

export const apiRouter = Router();

// Audit Logging Middleware
apiRouter.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    Database.logAudit({
      id: `AUD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      endpoint: req.originalUrl || req.url,
      method: req.method,
      statusCode: res.statusCode,
      ip: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress,
      durationMs: Date.now() - start
    });
  });
  next();
});

// 1. Available Products Catalog
apiRouter.get('/products', async (_req: Request, res: Response) => {
  try {
    const products = await hotRechargeAdapter.getProducts();
    res.json({ success: true, count: products.length, products });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Data Bundles Catalog
apiRouter.get('/bundles', (_req: Request, res: Response) => {
  res.json({ success: true, bundles: DATA_BUNDLES });
});

// 3. Customer & Meter Number Verification
apiRouter.get('/customer/:productId/:accountNumber', async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.productId, 10);
    const { accountNumber } = req.params;

    if (!accountNumber || accountNumber.length < 5) {
      return res.status(400).json({ success: false, error: 'Invalid account or meter number.' });
    }

    const customer = await hotRechargeAdapter.verifyCustomer(productId, accountNumber);
    res.json({ success: true, customer });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Tariff & Unit Estimator
apiRouter.get('/zesa/estimate', (req: Request, res: Response) => {
  const amount = parseFloat(req.query.amount as string) || 10.0;
  const estimate = calculateZesaUnits(amount);
  res.json({ success: true, amount, ...estimate });
});

// 5. Direct Recharge Execution (with Idempotency Protection)
apiRouter.post('/recharge', async (req: Request, res: Response) => {
  try {
    const body: RechargeRequest = req.body;

    // Strict Input Validation
    if (!body.target || !body.amount || !body.productId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters: target, amount, or productId'
      });
    }

    if (typeof body.amount !== 'number' || isNaN(body.amount) || body.amount < 0.10 || body.amount > 5000) {
      return res.status(400).json({
        success: false,
        error: 'Invalid amount. Minimum recharge is $0.10, maximum is $5,000.00'
      });
    }

    if (body.currency !== 'USD' && body.currency !== 'ZiG') {
      return res.status(400).json({
        success: false,
        error: 'Invalid currency. Must be USD or ZiG'
      });
    }

    // Idempotency check: prevent duplicate charges on network retries
    if (body.agentReference) {
      const existing = Database.getTransactionByReference(body.agentReference);
      if (existing) {
        return res.status(200).json({
          success: true,
          idempotent: true,
          message: 'Transaction previously fulfilled with identical reference.',
          recharge: existing
        });
      }
    } else {
      body.agentReference = `APP-${Date.now()}-${Math.floor(Math.random() * 9000)}`;
    }

    const rechargeResult = await hotRechargeAdapter.recharge(body);

    // Persist to Database Ledger
    Database.saveTransaction({
      id: rechargeResult.reference || `TXN-${Date.now()}`,
      reference: rechargeResult.reference,
      agentReference: body.agentReference,
      productId: body.productId,
      productName: rechargeResult.token ? 'ZETDC Electricity' : 'Mobile Airtime',
      target: body.target,
      customerName: rechargeResult.customerName,
      amount: body.amount,
      currency: body.currency,
      token: rechargeResult.token,
      kwh: rechargeResult.kwh,
      receiptNumber: rechargeResult.receiptNumber || rechargeResult.reference,
      status: 'SUCCESS',
      timestamp: rechargeResult.timestamp || new Date().toISOString(),
      vatAmount: Math.round(body.amount * 0.15 * 100) / 100
    });

    res.json({ success: true, recharge: rechargeResult });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. Two-Stage Reserved Recharge (Persists reservation to Database)
apiRouter.post('/recharge/reserve', async (req: Request, res: Response) => {
  try {
    const body: RechargeRequest = req.body;
    body.rechargeOptions = { makeReservation: true };
    if (!body.agentReference) {
      body.agentReference = `RES-${Date.now()}-${Math.floor(Math.random() * 9000)}`;
    }

    const reservedResult = await hotRechargeAdapter.recharge(body);

    Database.saveReservation({
      reference: body.agentReference,
      productId: body.productId,
      target: body.target,
      amount: body.amount,
      currency: body.currency,
      reservedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 15 * 60000).toISOString(),
      status: 'RESERVED'
    });

    res.json({ success: true, reservation: reservedResult });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. Complete Two-Stage Reserved Recharge
apiRouter.post('/recharge/complete', async (req: Request, res: Response) => {
  try {
    const { agentReference } = req.body;
    if (!agentReference) {
      return res.status(400).json({ success: false, error: 'agentReference is required' });
    }

    const completedResult = await hotRechargeAdapter.completeReservedRecharge(agentReference);
    Database.completeReservation(agentReference);

    res.json({ success: true, recharge: completedResult });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8. Query Transaction by Reference (from Database)
apiRouter.get('/transactions/:reference', async (req: Request, res: Response) => {
  try {
    const tx = Database.getTransactionByReference(req.params.reference) ||
               await hotRechargeAdapter.checkTransaction(req.params.reference);
    if (!tx) {
      return res.status(404).json({ success: false, error: 'Transaction reference not found' });
    }
    res.json({ success: true, transaction: tx });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 9. All Recent Transactions (from Database Ledger)
apiRouter.get('/transactions', (_req: Request, res: Response) => {
  const transactions = Database.getTransactions(100);
  res.json({ success: true, count: transactions.length, transactions });
});

// 10. Database Metrics & Health
apiRouter.get('/database/stats', (_req: Request, res: Response) => {
  res.json({ success: true, database: Database.getStats() });
});

// 11. Audit Logs for Security Audit
apiRouter.get('/database/audit', (_req: Request, res: Response) => {
  const logs = Database.getAuditLogs(100);
  res.json({ success: true, count: logs.length, logs });
});

// 12. Payment Simulation (EcoCash / OneMoney / InnBucks)
apiRouter.post('/payments/initiate', (req: Request, res: Response) => {
  const payment: PaymentInitiationRequest = req.body;
  const paymentRef = `PAY-${Date.now()}`;

  res.json({
    success: true,
    paymentReference: paymentRef,
    status: 'SUCCESS',
    promptSentTo: payment.phoneNumber,
    message: `Payment of ${payment.currency} ${payment.amount.toFixed(2)} received via ${payment.paymentMethod}.`
  });
});

// 13. ZIMRA S.I. 127 Fiscal Tax Invoice Generation & Verification
apiRouter.post('/fiscal/invoice', (req: Request, res: Response) => {
  try {
    const { transactionId, receiptNumber, customerName, amount, currency, productDescription, taxPayerNumber } = req.body;
    if (!amount || !customerName) {
      return res.status(400).json({ success: false, error: 'Missing required parameters: amount, customerName' });
    }

    const fiscal = zimraFiscalService.generateFiscalInvoice({
      transactionId: transactionId || `TXN-${Date.now()}`,
      receiptNumber: receiptNumber || `REC-${Date.now().toString().slice(-7)}`,
      customerName,
      taxPayerNumber,
      amount: typeof amount === 'number' ? amount : parseFloat(amount),
      currency: currency || 'USD',
      productDescription: productDescription || 'ZETDC Electricity / Airtime Recharge'
    });

    res.json({ success: true, fiscal });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
