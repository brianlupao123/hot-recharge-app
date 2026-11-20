export class PostgresService {
  private pool: any = null;
  public isConnected: boolean = false;

  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (connectionString) {
      try {
        // Safe dynamic load of pg driver if present in environment
        const { Pool } = require('pg');
        this.pool = new Pool({
          connectionString,
          ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
          max: 20,
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 5000
        });

        this.pool.on('error', (err: any) => {
          console.error('[Postgres] Unexpected database pool client error:', err.message);
          this.isConnected = false;
        });

        this.pool.query('SELECT 1')
          .then(() => {
            this.isConnected = true;
            console.log('[Postgres] Connected to enterprise PostgreSQL cluster successfully.');
          })
          .catch((err: any) => {
            console.warn('[Postgres] Connection test failed, operating in atomic fallback mode:', err.message);
            this.isConnected = false;
          });
      } catch (err: any) {
        console.log('[Postgres] pg driver not installed. Operating in zero-dependency atomic storage mode.');
      }
    } else {
      console.log('[Postgres] DATABASE_URL not set. Operating in zero-dependency atomic storage mode.');
    }
  }

  public async query(text: string, params?: any[]): Promise<any | null> {
    if (!this.pool || !this.isConnected) {
      return null;
    }
    try {
      return await this.pool.query(text, params);
    } catch (err: any) {
      console.error('[Postgres] Query execution error:', err.message);
      throw err;
    }
  }

  public async close(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      this.isConnected = false;
    }
  }
}

export const postgresService = new PostgresService();
