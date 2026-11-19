import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { apiRouter } from './routes/api';
import { authRouter } from './routes/auth';

const app = express();
const port = process.env.PORT || 5000;

// Security Headers Middleware
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

// Sliding-window IP Rate Limiter
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 120; // 120 requests/min per IP

app.use((req: Request, res: Response, next: NextFunction) => {
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return next();
  }

  record.count += 1;
  if (record.count > MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Enterprise rate limit exceeded, please retry shortly.'
    });
  }

  next();
});

app.use(cors());
app.use(express.json({ limit: '1mb' }));

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/v3', apiRouter);

// Health & System Info
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'HEALTHY',
    service: 'HOT Recharge V3 API Gateway & Simulator',
    competition: 'Computer Society of Zimbabwe (CSZ) Hackathon 2026',
    author: 'Brian Lupao',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    supportedProviders: ['ZETDC', 'Econet', 'NetOne', 'Telecel', 'TelOne', 'Nyaradzo'],
    paymentRails: ['EcoCash', 'OneMoney', 'InnBucks', 'Card', 'Wallet'],
    environment: process.env.NODE_ENV || 'production'
  });
});

const server = http.createServer(app);

// WebSockets Server for Real-Time Token Delivery & Payment Status
export const wss = new WebSocketServer({ server });

wss.on('connection', (ws: WebSocket) => {
  console.log('[WebSocket] Mobile client connected to live token event stream');
  ws.send(JSON.stringify({ type: 'CONNECTED', message: 'Connected to HOT Recharge Push Gateway' }));
});

// Broadcast helper for server-to-client events
export function broadcastEvent(event: { type: string; payload: any }) {
  const data = JSON.stringify(event);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

// Graceful Shutdown Handler
process.on('SIGTERM', () => {
  console.log('[Server] SIGTERM received, gracefully closing HTTP and WebSocket servers...');
  wss.close();
  server.close(() => {
    console.log('[Server] Process terminated cleanly.');
    process.exit(0);
  });
});

server.listen(port, () => {
  console.log(`=======================================================`);
  console.log(`  HOT RECHARGE V3 GATEWAY & SIMULATOR RUNNING`);
  console.log(`  Port: http://localhost:${port}`);
  console.log(`  Health Check: http://localhost:${port}/api/health`);
  console.log(`  CSZ Hackathon Build - Authored by Brian Lupao`);
  console.log(`=======================================================`);
});
