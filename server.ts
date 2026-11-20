import express, { Request, Response } from 'express';
import cors from 'cors';
import { Pool, types } from 'pg';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

// Parse PostgreSQL NUMERIC(5,2) (OID 1700) as float so range_low & range_high stay numbers
types.setTypeParser(1700, (val: string) => parseFloat(val));

if (!process.env.DATABASE_URL || process.env.DATABASE_URL.trim() === '') {
  throw new Error(
    'Missing required environment variable: DATABASE_URL. Set it in .env locally and in Render Environment Variables.'
  );
}

const dbUrl = new URL(process.env.DATABASE_URL);
dbUrl.searchParams.delete('sslmode');

const pool = new Pool({
  connectionString: dbUrl.toString(),
  ssl: { rejectUnauthorized: false },
});

const app = express();
const allowedOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const host = process.env.HOST ?? '0.0.0.0';
const port = Number(process.env.PORT ?? 3001);

app.disable('x-powered-by');
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Blocked by CORS policy'));
    },
    credentials: true,
  })
);
app.use(express.json());

let courseCache: { data: any[]; expiresAt: number } | null = null;
const COURSE_CACHE_TTL_MS = 1000 * 60 * 5;

async function getCoursesFromDatabase() {
  const now = Date.now();

  if (courseCache && courseCache.expiresAt > now) {
    return courseCache.data;
  }

  const { rows } = await pool.query(`
    SELECT d.*, r.jamb_subjects, r.olevel_subjects 
    FROM departments d
    LEFT JOIN requirements r ON d.id = r.department_id
    ORDER BY d.id ASC
  `);

  courseCache = {
    data: rows,
    expiresAt: now + COURSE_CACHE_TTL_MS,
  };

  return courseCache.data;
}

app.get('/api/health', async (_req: Request, res: Response) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'postgresql' });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

app.get('/api/courses', async (_req: Request, res: Response) => {
  try {
    const rows = await getCoursesFromDatabase();
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.listen(port, host, () => {
  console.log(`Backend API running on http://${host}:${port}`);
});