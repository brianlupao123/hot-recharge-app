import { Product, CustomerVerification } from '../types';

export const PRODUCTS: Product[] = [
  // ZETDC Prepaid Electricity
  {
    productId: 41,
    name: 'ZETDC USD Prepaid Electricity',
    accountTypeId: 3,
    category: 'Electricity',
    currency: 'USD',
    network: 'ZETDC',
    minimumRecharge: 2.0,
    maxRecharge: 500.0,
    targetType: 'ZETDC Meter Number',
    targetInfo: 'Enter 11 or 12 digit prepaid meter number'
  },
  {
    productId: 24,
    name: 'ZETDC ZiG Prepaid Electricity',
    accountTypeId: 1,
    category: 'Electricity',
    currency: 'ZiG',
    network: 'ZETDC',
    minimumRecharge: 50.0,
    maxRecharge: 20000.0,
    targetType: 'ZETDC Meter Number',
    targetInfo: 'Enter 11 or 12 digit prepaid meter number'
  },

  // Econet Airtime & Bundles
  {
    productId: 101,
    name: 'Econet USD Airtime',
    accountTypeId: 3,
    category: 'Airtime',
    currency: 'USD',
    network: 'Econet',
    networkPrefix: '77,78',
    minimumRecharge: 0.1,
    maxRecharge: 300.0,
    targetType: 'Econet Mobile Number',
    targetInfo: 'Mobile number starting with 077 or 078'
  },
  {
    productId: 111,
    name: 'Econet USD Data & Bundles',
    accountTypeId: 3,
    category: 'Data & Bundles',
    currency: 'USD',
    network: 'Econet',
    networkPrefix: '77,78',
    minimumRecharge: 1.0,
    maxRecharge: 100.0,
    targetType: 'Econet Mobile Number',
    targetInfo: 'WhatsApp, Weekly, Monthly and Private WiFi bundles'
  },
  {
    productId: 7,
    name: 'Econet ZiG Airtime',
    accountTypeId: 1,
    category: 'Airtime',
    currency: 'ZiG',
    network: 'Econet',
    networkPrefix: '77,78',
    minimumRecharge: 5.0,
    maxRecharge: 5000.0,
    targetType: 'Econet Mobile Number',
    targetInfo: 'Mobile number starting with 077 or 078'
  },

  // NetOne Airtime
  {
    productId: 102,
    name: 'NetOne USD Airtime',
    accountTypeId: 3,
    category: 'Airtime',
    currency: 'USD',
    network: 'NetOne',
    networkPrefix: '71',
    minimumRecharge: 0.5,
    maxRecharge: 300.0,
    targetType: 'NetOne Mobile Number',
    targetInfo: 'Mobile number starting with 071'
  },

  // Telecel Airtime
  {
    productId: 103,
    name: 'Telecel USD Airtime',
    accountTypeId: 3,
    category: 'Airtime',
    currency: 'USD',
    network: 'Telecel',
    networkPrefix: '73',
    minimumRecharge: 0.1,
    maxRecharge: 300.0,
    targetType: 'Telecel Mobile Number',
    targetInfo: 'Mobile number starting with 073'
  },

  // TelOne Broadband
  {
    productId: 31,
    name: 'TelOne Broadband Fiber / ADSL',
    accountTypeId: 3,
    category: 'Broadband',
    currency: 'USD',
    network: 'TelOne',
    minimumRecharge: 10.0,
    maxRecharge: 200.0,
    targetType: 'TelOne Account Number',
    targetInfo: 'TelOne broadband telephone or account number'
  },

  // Nyaradzo
  {
    productId: 15,
    name: 'Nyaradzo Life Assurance',
    accountTypeId: 3,
    category: 'Insurance',
    currency: 'USD',
    network: 'Nyaradzo',
    minimumRecharge: 5.0,
    maxRecharge: 500.0,
    targetType: 'Nyaradzo Policy Number',
    targetInfo: 'Active Nyaradzo policy reference number'
  }
];

export const MOCK_CUSTOMERS: Record<string, CustomerVerification> = {
  // Demo ZESA Meters
  '04192837461': {
    productId: 41,
    accountNumber: '04192837461',
    customerName: 'Brian Lupao',
    address: 'Stand 448, Fairview Crescent, Mutare',
    meterType: 'Conlog In-Home Prepayment (Single Phase)',
    isValid: true
  },
  '37194820194': {
    productId: 41,
    accountNumber: '37194820194',
    customerName: 'Africa University ICT Lab 3',
    address: 'Old Mutare Mission, Fairview Rd, Mutare',
    meterType: 'Hexing Three Phase Commercial',
    isValid: true
  },
  '07123456789': {
    productId: 41,
    accountNumber: '07123456789',
    customerName: 'Tendai Mashingaidze',
    address: '14 Harare Drive, Borrowdale, Harare',
    meterType: 'Actaris Single Phase Prepayment',
    isValid: true
  }
};

export const DATA_BUNDLES = [
  { code: 'W01', name: 'WhatsApp Daily 100MB', price: 0.5, validity: '24 Hours' },
  { code: 'W07', name: 'WhatsApp Weekly 500MB', price: 1.5, validity: '7 Days' },
  { code: 'W30', name: 'WhatsApp Monthly 1.5GB', price: 3.5, validity: '30 Days' },
  { code: 'D01', name: 'SmartData Daily 1.25GB', price: 2.0, validity: '24 Hours' },
  { code: 'D07', name: 'SmartData Weekly 5GB', price: 7.0, validity: '7 Days' },
  { code: 'D30', name: 'SmartData Monthly 25GB', price: 25.0, validity: '30 Days' },
  { code: 'PG01', name: 'Private WiFi 50GB', price: 38.0, validity: '30 Days' }
];

// Calculation of ZESA Tariff & KWh based on ZETDC Step Tariff
export function calculateZesaUnits(amountUsd: number): { kwh: number; tariffTier: string; breakdown: string } {
  // Approximate Lifeline stepped tariff
  // Tier 1 (Lifeline 1-50 kWh): ~$0.06 / kWh
  // Tier 2 (51-200 kWh): ~$0.12 / kWh
  // Tier 3 (>200 kWh): ~$0.19 / kWh
  let kwh = 0;
  let remaining = amountUsd;
  let tariffTier = 'Tier 1 (Lifeline Subsidized)';

  if (remaining <= 3.0) {
    kwh = remaining / 0.06;
    tariffTier = 'Tier 1 (Subsidized Lifeline)';
  } else if (remaining <= 21.0) {
    const tier1 = 50; // 50 * 0.06 = $3
    const tier2Amount = remaining - 3.0;
    const tier2Kwh = tier2Amount / 0.12;
    kwh = tier1 + tier2Kwh;
    tariffTier = 'Tier 2 (Standard Domestic)';
  } else {
    const tier1 = 50;
    const tier2 = 150; // 150 * 0.12 = $18
    const tier3Amount = remaining - 21.0;
    const tier3Kwh = tier3Amount / 0.19;
    kwh = tier1 + tier2 + tier3Kwh;
    tariffTier = 'Tier 3 (High-Usage Domestic)';
  }

  return {
    kwh: Math.round(kwh * 10) / 10,
    tariffTier,
    breakdown: `${Math.round(kwh * 10) / 10} kWh issued at ${tariffTier}`
  };
}

// Generate realistic 20-digit token formatted in groups of 4
export function generateZesaToken(): string {
  const parts: string[] = [];
  for (let i = 0; i < 5; i++) {
    const num = Math.floor(1000 + Math.random() * 9000);
    parts.push(num.toString());
  }
  return parts.join('-');
}
