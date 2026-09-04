import express, { Request, Response } from 'express';
import cors from 'cors';
import mysql, { PoolOptions } from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
const missingEnvVars = requiredEnvVars.filter(
  (key) => !process.env[key] || process.env[key]?.trim() === ''
);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(', ')}. Create a local .env file at the project root and keep it out of version control.`
  );
}

const app = express();
const allowedOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const host = process.env.HOST ?? '127.0.0.1';
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

const poolOptions: PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT ?? 3306),
  waitForConnections: true,
  multipleStatements: true,
  ...(process.env.DB_SSL === 'true' && { ssl: { rejectUnauthorized: false } })
};

const pool = mysql.createPool(poolOptions);

let courseCache: { data: any[]; expiresAt: number } | null = null;
const COURSE_CACHE_TTL_MS = 1000 * 60 * 5;

async function getCoursesFromDatabase() {
  const now = Date.now();

  if (courseCache && courseCache.expiresAt > now) {
    return courseCache.data;
  }

  const [rows] = await pool.query(`
    SELECT d.*, r.jamb_subjects, r.olevel_subjects 
    FROM departments d
    LEFT JOIN requirements r ON d.id = r.department_id
  `);

  courseCache = {
    data: rows as any[],
    expiresAt: now + COURSE_CACHE_TTL_MS,
  };

  return courseCache.data;
}

async function initDatabase() {
  if (process.env.SEED_ON_START !== 'true') {
    console.log('Database seeding is disabled. Set SEED_ON_START=true to initialize from the SQL backup.');
    return;
  }

  try {
    const sqlPath = path.resolve(__dirname, './futa_backup.sql');
    if (!fs.existsSync(sqlPath)) {
      console.warn(`SQL backup not found at ${sqlPath}. Skipping seed.`);
      return;
    }

    console.log('Reading SQL backup file...');
    const sqlString = fs.readFileSync(sqlPath, 'utf8');
    await pool.query(sqlString);
    console.log('FUTA data successfully injected into the configured database.');
  } catch (err) {
    console.error('Error seeding database:', err);
  }
}

initDatabase();

app.get('/api/courses', async (req: Request, res: Response) => {
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