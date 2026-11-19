import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { Database } from '../services/database';

export const authRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'hot-recharge-production-secret-2026';

// Lightweight cryptographic session token generator
function generateToken(userId: string): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(
    JSON.stringify({
      sub: userId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 86400 * 30 // 30 days
    })
  ).toString('base64url');

  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${payload}`)
    .digest('base64url');

  return `${header}.${payload}.${signature}`;
}

function verifyToken(token: string): { sub: string } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, payload, signature] = parts;

    const expected = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${header}.${payload}`)
      .digest('base64url');

    if (expected !== signature) return null;

    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8'));
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) return null;

    return decoded;
  } catch {
    return null;
  }
}

// 1. REGISTER
authRouter.post('/register', (req: Request, res: Response) => {
  try {
    const { name, phone, email, pin } = req.body;

    if (!name || !phone || !email || !pin) {
      return res.status(400).json({
        success: false,
        error: 'Name, phone, email, and 4-digit PIN are required.'
      });
    }

    if (String(pin).length < 4) {
      return res.status(400).json({
        success: false,
        error: 'PIN must be at least 4 digits.'
      });
    }

    const user = Database.registerUser(name, phone, email, String(pin));
    const token = generateToken(user.id);

    return res.status(201).json({
      success: true,
      message: 'Account registered successfully.',
      token,
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        walletBalanceUsd: user.walletBalanceUsd,
        walletBalanceZig: user.walletBalanceZig,
        createdAt: user.createdAt
      }
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      error: err.message || 'Registration failed.'
    });
  }
});

// 2. LOGIN
authRouter.post('/login', (req: Request, res: Response) => {
  try {
    const { identifier, pin } = req.body;

    if (!identifier || !pin) {
      return res.status(400).json({
        success: false,
        error: 'Identifier (phone/email) and PIN are required.'
      });
    }

    const user = Database.authenticateUser(String(identifier), String(pin));
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials. Please verify your phone number/email and PIN.'
      });
    }

    const token = generateToken(user.id);

    return res.json({
      success: true,
      message: 'Authentication successful.',
      token,
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        walletBalanceUsd: user.walletBalanceUsd,
        walletBalanceZig: user.walletBalanceZig,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: 'Authentication failed due to an internal error.'
    });
  }
});

// 3. GET CURRENT PROFILE (/api/auth/me)
authRouter.get('/me', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Unauthorized. Token required.' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ success: false, error: 'Invalid or expired session token.' });
  }

  const user = Database.getUserById(decoded.sub);
  if (!user) {
    return res.status(404).json({ success: false, error: 'User account not found.' });
  }

  return res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      walletBalanceUsd: user.walletBalanceUsd,
      walletBalanceZig: user.walletBalanceZig,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin
    }
  });
});

// 4. LOGOUT
authRouter.post('/logout', (_req: Request, res: Response) => {
  return res.json({ success: true, message: 'Logged out successfully.' });
});
