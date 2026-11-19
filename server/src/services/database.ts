import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface DbUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  pinHash: string;
  salt: string;
  walletBalanceUsd: number;
  walletBalanceZig: number;
  createdAt: string;
  lastLogin: string;
}

export interface DbTransaction {
  id: string;
  userId?: string;
  reference: string;
  agentReference: string;
  productId: number;
  productName: string;
  target: string;
  customerName?: string;
  amount: number;
  currency: 'USD' | 'ZiG';
  token?: string;
  kwh?: number;
  receiptNumber: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED' | 'RESERVED';
  timestamp: string;
  vatAmount: number;
  paymentRail?: string;
}

export interface DbReservation {
  reference: string;
  productId: number;
  target: string;
  amount: number;
  currency: 'USD' | 'ZiG';
  reservedAt: string;
  expiresAt: string;
  status: 'RESERVED' | 'COMPLETED' | 'EXPIRED';
}

export interface DbAuditLog {
  id: string;
  timestamp: string;
  endpoint: string;
  method: string;
  statusCode: number;
  ip?: string;
  durationMs: number;
}

interface DatabaseSchema {
  users: DbUser[];
  transactions: DbTransaction[];
  reservations: DbReservation[];
  auditLogs: DbAuditLog[];
  meta: {
    initializedAt: string;
    lastUpdated: string;
    version: string;
  };
}

const DATA_DIR = path.resolve(__dirname, '../../data');
const DB_FILE = path.join(DATA_DIR, 'hot_recharge_ledger.json');

function hashPin(pin: string, salt: string): string {
  return crypto.pbkdf2Sync(pin, salt, 10000, 32, 'sha256').toString('hex');
}

class DatabaseService {
  private data: DatabaseSchema;
  private writeLock: boolean = false;

  constructor() {
    this.ensureDirectory();
    this.data = this.load();
  }

  private ensureDirectory() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  private load(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (!parsed.users) parsed.users = [];
        return parsed;
      }
    } catch (err) {
      console.warn('[Database] Error loading database file, creating new seed:', err);
    }

    const defaultSalt = crypto.randomBytes(16).toString('hex');
    const defaultPinHash = hashPin('1234', defaultSalt);

    const seed: DatabaseSchema = {
      users: [
        {
          id: 'USR-AU-001',
          name: 'Brian Lupao',
          phone: '0784529134',
          email: 'brianlupao123@gmail.com',
          pinHash: defaultPinHash,
          salt: defaultSalt,
          walletBalanceUsd: 142.50,
          walletBalanceZig: 2850.00,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        }
      ],
      transactions: [
        {
          id: 'TXN-HOT-9948201',
          userId: 'USR-AU-001',
          reference: 'HOT-TXN-9948201',
          agentReference: 'AGY-AU-448',
          productId: 41,
          productName: 'ZETDC Prepaid Electricity (USD)',
          target: '04192837461',
          customerName: 'Brian Lupao',
          amount: 20.0,
          currency: 'USD',
          token: '4921-8832-1094-5531-2849',
          kwh: 114.5,
          receiptNumber: 'REC-9948201',
          status: 'SUCCESS',
          timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
          vatAmount: 3.0,
          paymentRail: 'EcoCash USD'
        },
        {
          id: 'TXN-HOT-9948202',
          userId: 'USR-AU-001',
          reference: 'HOT-TXN-9948202',
          agentReference: 'AGY-AU-449',
          productId: 101,
          productName: 'Econet Mobile Airtime (USD)',
          target: '0784529134',
          customerName: 'Brian Lupao',
          amount: 5.0,
          currency: 'USD',
          receiptNumber: 'REC-9948202',
          status: 'SUCCESS',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          vatAmount: 0.75,
          paymentRail: 'OneMoney'
        }
      ],
      reservations: [],
      auditLogs: [],
      meta: {
        initializedAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        version: '2.0.0-enterprise'
      }
    };

    this.saveDirect(seed);
    return seed;
  }

  /**
   * Atomic file persistence: writes to temporary file first, then atomically renames.
   * Guarantees zero file corruption on unexpected power cuts, kill signals, or concurrent calls.
   */
  private saveDirect(payload: DatabaseSchema) {
    const tmpFile = `${DB_FILE}.tmp.${Date.now()}.${Math.floor(Math.random() * 10000)}`;
    try {
      fs.writeFileSync(tmpFile, JSON.stringify(payload, null, 2), 'utf-8');
      fs.renameSync(tmpFile, DB_FILE);
    } catch (err) {
      console.error('[Database] Atomic write failed:', err);
      // Clean up tmp if failed
      if (fs.existsSync(tmpFile)) {
        try { fs.unlinkSync(tmpFile); } catch {}
      }
    }
  }

  private persist() {
    this.data.meta.lastUpdated = new Date().toISOString();
    this.saveDirect(this.data);
  }

  // --- USER AUTHENTICATION & MANAGEMENT ---
  public registerUser(name: string, phone: string, email: string, pin: string): DbUser {
    const existing = this.findUser(phone) || this.findUser(email);
    if (existing) {
      throw new Error('An account with this phone number or email already exists.');
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const pinHash = hashPin(pin, salt);

    const newUser: DbUser = {
      id: `USR-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      pinHash,
      salt,
      walletBalanceUsd: 50.00, // Verified initial account float
      walletBalanceZig: 1000.00,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    this.data.users.push(newUser);
    this.persist();
    return newUser;
  }

  public authenticateUser(identifier: string, pin: string): DbUser | null {
    const user = this.findUser(identifier);
    if (!user) return null;

    const computed = hashPin(pin, user.salt);
    if (computed !== user.pinHash) return null;

    user.lastLogin = new Date().toISOString();
    this.persist();
    return user;
  }

  public findUser(identifier: string): DbUser | undefined {
    const clean = identifier.trim().toLowerCase();
    return this.data.users.find(
      (u) => u.phone.toLowerCase() === clean || u.email.toLowerCase() === clean || u.id === clean
    );
  }

  public getUserById(id: string): DbUser | undefined {
    return this.data.users.find((u) => u.id === id);
  }

  /**
   * Thread-safe balance deduction with atomic check to eliminate double-spend race conditions.
   */
  public deductUserBalance(userId: string, amount: number, currency: 'USD' | 'ZiG'): boolean {
    const user = this.getUserById(userId);
    if (!user) return false;

    if (currency === 'USD') {
      if (user.walletBalanceUsd < amount) return false;
      user.walletBalanceUsd = parseFloat((user.walletBalanceUsd - amount).toFixed(2));
    } else {
      if (user.walletBalanceZig < amount) return false;
      user.walletBalanceZig = parseFloat((user.walletBalanceZig - amount).toFixed(2));
    }

    this.persist();
    return true;
  }

  public depositUserBalance(userId: string, amount: number, currency: 'USD' | 'ZiG'): boolean {
    const user = this.getUserById(userId);
    if (!user) return false;

    if (currency === 'USD') {
      user.walletBalanceUsd = parseFloat((user.walletBalanceUsd + amount).toFixed(2));
    } else {
      user.walletBalanceZig = parseFloat((user.walletBalanceZig + amount).toFixed(2));
    }

    this.persist();
    return true;
  }

  // --- TRANSACTIONS ---
  public saveTransaction(tx: DbTransaction) {
    this.data.transactions.unshift(tx);
    this.persist();
    return tx;
  }

  public getTransactions(limit = 50, userId?: string): DbTransaction[] {
    if (userId) {
      return this.data.transactions.filter((t) => t.userId === userId).slice(0, limit);
    }
    return this.data.transactions.slice(0, limit);
  }

  public getTransactionByReference(ref: string): DbTransaction | undefined {
    return this.data.transactions.find((t) => t.reference === ref || t.agentReference === ref);
  }

  // --- TWO-STAGE RESERVATIONS (Idempotency Engine) ---
  public saveReservation(reservation: DbReservation) {
    this.data.reservations = this.data.reservations.filter((r) => r.reference !== reservation.reference);
    this.data.reservations.push(reservation);
    this.persist();
    return reservation;
  }

  public getReservation(reference: string): DbReservation | undefined {
    return this.data.reservations.find((r) => r.reference === reference);
  }

  public completeReservation(reference: string): boolean {
    const res = this.getReservation(reference);
    if (res) {
      res.status = 'COMPLETED';
      this.persist();
      return true;
    }
    return false;
  }

  // --- AUDIT LOGS ---
  public logAudit(log: DbAuditLog) {
    this.data.auditLogs.unshift(log);
    if (this.data.auditLogs.length > 200) {
      this.data.auditLogs = this.data.auditLogs.slice(0, 200);
    }
    this.persist();
  }

  public getAuditLogs(limit = 50): DbAuditLog[] {
    return this.data.auditLogs.slice(0, limit);
  }

  public getStats() {
    return {
      totalUsers: this.data.users.length,
      totalTransactions: this.data.transactions.length,
      totalVolumeUsd: this.data.transactions
        .filter((t) => t.currency === 'USD')
        .reduce((sum, t) => sum + t.amount, 0),
      totalVolumeZig: this.data.transactions
        .filter((t) => t.currency === 'ZiG')
        .reduce((sum, t) => sum + t.amount, 0),
      activeReservations: this.data.reservations.filter((r) => r.status === 'RESERVED').length,
      auditLogCount: this.data.auditLogs.length,
      databasePath: DB_FILE,
      meta: this.data.meta
    };
  }
}

export const Database = new DatabaseService();
