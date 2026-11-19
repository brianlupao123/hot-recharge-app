import assert from 'node:assert';
import { test, describe } from 'node:test';
import { calculateZesaUnits, generateZesaToken, PRODUCTS, MOCK_CUSTOMERS } from '../services/mockData';
import { hotRechargeAdapter } from '../adapters/hotRechargeV3';

describe('HOT Recharge V3 Business Logic & Calculations', () => {
  test('Stepped Lifeline Tariff: $3.00 USD should yield exactly 50 kWh at Tier 1 subsidized rate', () => {
    const result = calculateZesaUnits(3.0);
    assert.strictEqual(result.kwh, 50.0);
    assert.match(result.tariffTier, /Tier 1/);
  });

  test('Stepped Lifeline Tariff: $20.00 USD should include Tier 1 and spill into Tier 2', () => {
    const result = calculateZesaUnits(20.0);
    assert.ok(result.kwh > 50.0, 'KWh should exceed 50 kWh');
    assert.match(result.tariffTier, /Tier 2/);
  });

  test('20-Digit Token Format: Must be exactly 5 blocks of 4 numeric digits', () => {
    const token = generateZesaToken();
    const regex = /^\d{4}-\d{4}-\d{4}-\d{4}-\d{4}$/;
    assert.match(token, regex, `Token ${token} does not match 20-digit pattern`);
    const digitsOnly = token.replace(/-/g, '');
    assert.strictEqual(digitsOnly.length, 20);
  });

  test('Carrier Prefix Rules: Validates Zimbabwean MNO ranges', () => {
    const detectCarrier = (num: string) => {
      const clean = num.replace(/[^0-9]/g, '');
      if (clean.startsWith('077') || clean.startsWith('078')) return 'Econet';
      if (clean.startsWith('071')) return 'NetOne';
      if (clean.startsWith('073')) return 'Telecel';
      return 'Unknown';
    };

    assert.strictEqual(detectCarrier('0778068942'), 'Econet');
    assert.strictEqual(detectCarrier('0781234567'), 'Econet');
    assert.strictEqual(detectCarrier('0719876543'), 'NetOne');
    assert.strictEqual(detectCarrier('0735551234'), 'Telecel');
    assert.strictEqual(detectCarrier('0799999999'), 'Unknown');
  });

  test('Official Products Catalog: Must contain ZETDC, Econet, NetOne, and Bundles with valid ProductIds', () => {
    const productIds = PRODUCTS.map((p) => p.productId);
    assert.ok(productIds.includes(41), 'ZETDC USD (41) missing');
    assert.ok(productIds.includes(24), 'ZETDC ZiG (24) missing');
    assert.ok(productIds.includes(101), 'Econet USD (101) missing');
    assert.ok(productIds.includes(102), 'NetOne USD (102) missing');
    assert.ok(productIds.includes(111), 'Data Bundles (111) missing');
  });
});

describe('HOT Recharge V3 Adapter & Two-Stage Idempotency', () => {
  test('Customer Verification: Known demo meter returns verified holder Brian Lupao', async () => {
    const cust = await hotRechargeAdapter.verifyCustomer(41, '04192837461');
    assert.strictEqual(cust.isValid, true);
    assert.strictEqual(cust.customerName, 'Brian Lupao');
  });

  test('Direct Recharge: Generates receipt and token for ZETDC purchase', async () => {
    const res = await hotRechargeAdapter.recharge({
      agentReference: `TEST-REF-${Date.now()}`,
      productId: 41,
      target: '04192837461',
      amount: 20.0,
      currency: 'USD'
    });

    assert.strictEqual(res.status, 'SUCCESS');
    assert.ok(res.token, 'Token should be present for ZESA recharge');
    assert.ok(res.receiptNumber, 'Receipt number must be generated');
  });

  test('Two-Stage Idempotent Reservation & Completion: Locks recharge before settlement', async () => {
    const agentRef = `TEST-RES-${Date.now()}`;
    
    // Stage 1: Make reservation
    const reserved = await hotRechargeAdapter.recharge({
      agentReference: agentRef,
      productId: 41,
      target: '04192837461',
      amount: 15.0,
      currency: 'USD',
      rechargeOptions: { makeReservation: true }
    });

    assert.strictEqual(reserved.status, 'RESERVED');

    // Stage 2: Complete reservation upon simulated payment
    const completed = await hotRechargeAdapter.completeReservedRecharge(agentRef);
    assert.strictEqual(completed.status, 'SUCCESS');
    assert.ok(completed.token, 'Token must be issued upon completion');
  });
});

describe('Database User Authentication & Security', () => {
  const { Database } = require('../services/database');

  test('User Authentication: Existing user Brian Lupao authenticates with PIN 1234', () => {
    const user = Database.authenticateUser('0784529134', '1234');
    assert.ok(user, 'User should authenticate successfully');
    assert.strictEqual(user.name, 'Brian Lupao');
    assert.ok(user.walletBalanceUsd > 0);
  });

  test('User Authentication: Fails with incorrect PIN', () => {
    const user = Database.authenticateUser('0784529134', '9999');
    assert.strictEqual(user, null, 'Authentication must fail with incorrect PIN');
  });

  test('User Registration: Creates new user with hashed PIN and initial wallet float', () => {
    const testPhone = `078${Math.floor(1000000 + Math.random() * 9000000)}`;
    const testEmail = `user${Date.now()}@africau.edu`;
    const newUser = Database.registerUser('Test Member', testPhone, testEmail, '5678');

    assert.ok(newUser.id.startsWith('USR-'));
    assert.strictEqual(newUser.name, 'Test Member');
    assert.strictEqual(newUser.walletBalanceUsd, 50.0);

    // Verify authentication immediately works
    const auth = Database.authenticateUser(testPhone, '5678');
    assert.ok(auth, 'Newly registered user should authenticate immediately');
  });
});
