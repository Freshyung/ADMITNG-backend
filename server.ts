import express, { Request, Response } from 'express';
import cors from 'cors';
import mysql, { PoolOptions } from 'mysql2/promise';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(express.json());

const poolOptions: PoolOptions = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Freshnation2',
  database: process.env.DB_HOST ? process.env.DB_NAME : 'futa_calculator',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  waitForConnections: true,
  multipleStatements: true,
  ...(process.env.DB_HOST && { ssl: { rejectUnauthorized: false } })
};

const pool = mysql.createPool(poolOptions);

async function initDatabase() {
  try {
    console.log("Reading SQL backup file...");
    
    // Read the backup file we pushed to GitHub
    const sqlString = fs.readFileSync('futa_backup.sql', 'utf8');
    
    // Execute the entire file to insert all your FUTA data
    await pool.query(sqlString);
    
    console.log("FUTA Data successfully injected into Aiven!");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
}

// Execute the initializer
initDatabase();

app.get('/api/courses', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(`
      SELECT d.*, r.jamb_subjects, r.olevel_subjects 
      FROM departments d
      LEFT JOIN requirements r ON d.id = r.department_id
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});