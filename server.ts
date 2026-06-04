import express, { Request, Response } from 'express';
import cors from 'cors';
import mysql, { PoolOptions } from 'mysql2/promise';

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
  ...(process.env.DB_HOST && { ssl: { rejectUnauthorized: false } })
};

const pool = mysql.createPool(poolOptions);

async function initDatabase() {
  try {
    console.log("Checking and seeding database tables...");
    
    // 1. Create Departments Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS departments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        cut_off_mark DECIMAL(5,2) NOT NULL
      )
    `);

    // 2. Create Requirements Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS requirements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        department_id INT,
        jamb_subjects VARCHAR(255),
        olevel_subjects VARCHAR(255),
        FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
      )
    `);

    console.log("Database tables verified successfully!");
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