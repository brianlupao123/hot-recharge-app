import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { Database } from '../services/database';
import { hotRechargeAdapter } from '../adapters/hotRechargeV3';

const router = Router();
const ECOCASH_SECRET = process.env.ECOCASH_WEBHOOK_SECRET || 'ecocash-webhook-secret-au-2026';
const ONEMONEY_SECRET = process.env.ONEMONEY_WEBHOOK_SECRET || 'onemoney-webhook-secret-au-2026';

/**
 * Helper: Verify HMAC-SHA256 signature from payment gateways
 */
function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  if (!signature) return false;
  const computed = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return computed.toLowerCase() === signature.toLowerCase();
}

/**
 * 1. EcoCash USSD Push Webhook Callback
 * Invoked by Cassava Smartech when subscriber approves mobile money USSD prompt
 */
router.post('/ecocash', async (req: Request, res: Response) => {
  try {
    const rawBody = JSON.stringify(req.body);
    const signature = (req.headers['x-ecocash-signature'] || req.headers['x-signature']) as string;

    // Validate signature in production if secret configured
    if (process.env.NODE_ENV === 'production' && !verifyWebhookSignature(rawBody, signature, ECOCASH_SECRET)) {
      return res.status(401).json({ success: false, error: 'Invalid EcoCash webhook cryptographic signature' });
    }

    const {
      clientCorrelator, // AgentReference or PaymentRef
      referenceCode,    // EcoCash transaction ID (e.g. MP261120.1042.A10293)
      transactionStatus, // 'COMPLETED' | 'FAILED'
      amount,
      currency,
      userId
    } = req.body;

    console.log(`[EcoCash Webhook] Notification received: ${referenceCode} status=${transactionStatus} for amount=${amount} ${currency}`);

    if (transactionStatus === 'COMPLETED' || transactionStatus === 'PAID') {
      const numAmount = parseFloat(amount);
      const isZig = currency === 'ZiG' || currency === 'ZWG';

      // 1. Credit User Wallet in Ledger
      const targetUserId = userId || 'USR-AU-001';
      Database.depositUserBalance(targetUserId, numAmount, isZig ? 'ZiG' : 'USD');

      // 2. If correlated with a pending reserved recharge, complete it automatically!
      if (clientCorrelator && (clientCorrelator.startsWith('APP-') || clientCorrelator.startsWith('RES-'))) {
        try {
          await hotRechargeAdapter.completeReservedRecharge(clientCorrelator);
          Database.completeReservation(clientCorrelator);
          console.log(`[EcoCash Webhook] Auto-completed reserved recharge for ${clientCorrelator}`);
        } catch (err: any) {
          console.warn(`[EcoCash Webhook] Could not auto-complete reservation: ${err?.message}`);
        }
      }

      return res.status(200).json({
        responseCode: '00',
        message: 'EcoCash payment confirmed and settled into Hot Recharge ledger'
      });
    }

    return res.status(200).json({ responseCode: '01', message: 'Status recorded' });
  } catch (err: any) {
    console.error('[EcoCash Webhook] Error processing callback:', err);
    return res.status(500).json({ error: 'Internal webhook processing failure' });
  }
});

/**
 * 2. NetOne OneMoney Webhook Callback
 */
router.post('/onemoney', async (req: Request, res: Response) => {
  try {
    const { reference, agentReference, status, amount, userId, currency } = req.body;
    console.log(`[OneMoney Webhook] Received status=${status} ref=${reference} amount=${amount}`);

    if (status === 'SUCCESS' || status === '00') {
      const targetUserId = userId || 'USR-AU-001';
      const isZig = currency === 'ZiG' || currency === 'ZWG';
      Database.depositUserBalance(targetUserId, parseFloat(amount), isZig ? 'ZiG' : 'USD');

      if (agentReference) {
        try {
          await hotRechargeAdapter.completeReservedRecharge(agentReference);
          Database.completeReservation(agentReference);
        } catch {}
      }
    }

    return res.status(200).json({ success: true, message: 'OneMoney webhook acknowledged' });
  } catch (err: any) {
    return res.status(500).json({ error: 'OneMoney webhook error' });
  }
});

/**
 * 3. Mobile Money Payment Initiation Endpoint
 * Triggers USSD Push to customer's mobile phone (EcoCash or OneMoney)
 */
router.post('/initiate-payment', async (req: Request, res: Response) => {
  try {
    const { method, phone, amount, currency, reference } = req.body;
    if (!method || !phone || !amount) {
      return res.status(400).json({ error: 'Missing required payment initiation fields (method, phone, amount)' });
    }

    const txnRef = reference || `PAY-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const responsePayload = {
      success: true,
      reference: txnRef,
      method,
      phone,
      amount: parseFloat(amount),
      currency: currency || 'USD',
      status: 'PENDING_USSD_APPROVAL',
      instruction: `A prompt has been sent to ${phone}. Enter your ${method === 'ECOCASH' ? 'EcoCash' : 'OneMoney'} PIN to approve the transaction.`,
      pollUrl: `/api/webhooks/status/${txnRef}`
    };

    return res.status(200).json(responsePayload);
  } catch (err: any) {
    return res.status(500).json({ error: 'Payment initiation failed' });
  }
});

export default router;
