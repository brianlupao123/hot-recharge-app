-- =========================================================================
-- HOT Recharge Zimbabwe: Enterprise Relational Database Schema (PostgreSQL 15+)
-- Designed for High-Throughput Financial Utility Ledger & Nationwide Scaling
-- =========================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS & ACCESS IDENTITIES
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(32) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    pin_hash VARCHAR(255) NOT NULL,
    pin_salt VARCHAR(64) NOT NULL,
    role VARCHAR(32) DEFAULT 'CONSUMER' CHECK (role IN ('CONSUMER', 'AGENT', 'MERCHANT', 'ADMIN')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- 2. MULTI-CURRENCY WALLETS (USD & ZiG Ledgers)
CREATE TABLE IF NOT EXISTS wallets (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    currency VARCHAR(8) NOT NULL CHECK (currency IN ('USD', 'ZiG')),
    balance NUMERIC(14, 2) NOT NULL DEFAULT 0.00 CHECK (balance >= 0.00),
    reserved_balance NUMERIC(14, 2) NOT NULL DEFAULT 0.00 CHECK (reserved_balance >= 0.00),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, currency)
);

CREATE INDEX IF NOT EXISTS idx_wallets_user_currency ON wallets(user_id, currency);

-- 3. FINANCIAL TRANSACTIONS & RECHARGES
CREATE TABLE IF NOT EXISTS transactions (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    reference VARCHAR(128) UNIQUE NOT NULL,
    agent_reference VARCHAR(128) UNIQUE NOT NULL,
    product_id INTEGER NOT NULL,
    product_name VARCHAR(128) NOT NULL,
    target VARCHAR(64) NOT NULL,
    customer_name VARCHAR(255),
    amount NUMERIC(14, 2) NOT NULL CHECK (amount > 0),
    currency VARCHAR(8) NOT NULL CHECK (currency IN ('USD', 'ZiG')),
    vat_amount NUMERIC(14, 2) DEFAULT 0.00,
    status VARCHAR(32) NOT NULL CHECK (status IN ('PENDING', 'RESERVED', 'SUCCESS', 'FAILED', 'REVERSED')),
    token VARCHAR(64),
    kwh NUMERIC(10, 2),
    receipt_number VARCHAR(64),
    payment_method VARCHAR(32) DEFAULT 'WALLET',
    sync_status VARCHAR(32) DEFAULT 'SYNCED' CHECK (sync_status IN ('SYNCED', 'QUEUED_OFFLINE')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_transactions_user ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_reference ON transactions(reference);
CREATE INDEX IF NOT EXISTS idx_transactions_agent_ref ON transactions(agent_reference);
CREATE INDEX IF NOT EXISTS idx_transactions_target ON transactions(target);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);

-- 4. SAVED FLEET METERS (Commercial & Residential Properties)
CREATE TABLE IF NOT EXISTS saved_meters (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    nickname VARCHAR(128) NOT NULL,
    meter_number VARCHAR(32) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    address TEXT,
    est_remaining_kwh NUMERIC(10, 2) DEFAULT 0.00,
    lifeline_eligible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_saved_meters_user ON saved_meters(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_meters_meter_no ON saved_meters(meter_number);

-- 5. ZIMRA S.I. 127 FISCAL INVOICES
CREATE TABLE IF NOT EXISTS fiscal_invoices (
    id VARCHAR(64) PRIMARY KEY,
    transaction_id VARCHAR(64) REFERENCES transactions(id) ON DELETE CASCADE,
    invoice_number VARCHAR(128) UNIQUE NOT NULL,
    device_id VARCHAR(64) NOT NULL,
    buyer_name VARCHAR(255) NOT NULL,
    tax_payer_number VARCHAR(64),
    subtotal NUMERIC(14, 2) NOT NULL,
    vat_rate NUMERIC(6, 4) DEFAULT 0.1500,
    vat_amount NUMERIC(14, 2) NOT NULL,
    total_amount NUMERIC(14, 2) NOT NULL,
    currency VARCHAR(8) NOT NULL,
    fiscal_signature VARCHAR(128) NOT NULL,
    qr_code_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_fiscal_invoice_no ON fiscal_invoices(invoice_number);

-- 6. AUDIT LOGS (Zero-Trust Security & PCI Compliance)
CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64),
    endpoint VARCHAR(255) NOT NULL,
    method VARCHAR(16) NOT NULL,
    status_code INTEGER NOT NULL,
    ip_address VARCHAR(64),
    duration_ms INTEGER,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);
