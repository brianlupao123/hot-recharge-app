export interface Product {
  productId: number;
  name: string;
  accountTypeId: number;
  category: 'Airtime' | 'Data & Bundles' | 'Electricity' | 'Broadband' | 'Insurance';
  currency: 'USD' | 'ZiG';
  network?: 'Econet' | 'NetOne' | 'Telecel' | 'ZETDC' | 'TelOne' | 'Nyaradzo';
  networkPrefix?: string;
  minimumRecharge: number;
  maxRecharge: number;
  targetType: string;
  targetInfo: string;
}

export interface CustomerVerification {
  productId: number;
  accountNumber: string;
  customerName: string;
  address?: string;
  meterType?: string;
  balance?: number;
  isValid: boolean;
}

export interface RechargeRequest {
  agentReference: string;
  productId: number;
  target: string;
  amount: number;
  currency: 'USD' | 'ZiG';
  customerSMS?: string;
  productCode?: string; // For data bundles
  rechargeOptions?: {
    makeReservation?: boolean;
    sendReservationSMSToCustomer?: boolean;
    productCode?: string;
  };
}

export interface RechargeResponse {
  reference: string;
  agentReference: string;
  status: 'SUCCESS' | 'RESERVED' | 'FAILED' | 'PENDING';
  message: string;
  amount: number;
  currency: 'USD' | 'ZiG';
  target: string;
  timestamp: string;
  // ZESA Specific Fields
  token?: string; // 20-digit token e.g. 4921-8832-1094-5531-2849
  kwh?: number; // e.g. 114.5
  units?: string;
  receiptNumber?: string;
  customerName?: string;
  debtDeduction?: number;
  // Carrier Specific Fields
  carrierReference?: string;
  initialBalance?: number;
  finalBalance?: number;
}

export interface PaymentInitiationRequest {
  rechargeReference: string;
  amount: number;
  currency: 'USD' | 'ZiG';
  paymentMethod: 'EcoCash' | 'OneMoney' | 'InnBucks' | 'Card' | 'Wallet';
  phoneNumber: string;
}

export interface PaymentStatusResponse {
  paymentReference: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  method: string;
  amount: number;
  currency: 'USD' | 'ZiG';
  transactionId?: string;
}
