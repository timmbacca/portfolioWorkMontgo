import { Pool } from 'pg';

const {
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  CLOUD_SQL_CONNECTION_NAME
} = process.env;

if (!DB_USER || !DB_PASSWORD || !DB_NAME || !CLOUD_SQL_CONNECTION_NAME) {
  console.error('Database environment variables are not set');
  process.exit(1);
}

// When running in the Cloud Run environment, the host is the path to the Unix socket
// for the Cloud SQL instance.
const isProduction = process.env.NODE_ENV === 'production';
const host = isProduction
  ? `/cloudsql/${CLOUD_SQL_CONNECTION_NAME}`
  : process.env.DB_HOST; // For local development

export const pool = new Pool({
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: host,
  ssl: false,
});