import { ServerConfig } from '../types';

export const config: ServerConfig = {
  port: Number(process.env['PORT']) || 3000,
  host: process.env['HOST'] || '0.0.0.0',
  database: {
    path: process.env['DATABASE_PATH'] || './data/database.db',
    enableWAL: process.env['DATABASE_WAL'] === 'true' || true,
  },
};
