import express, { Request, Response } from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// This connects directly to the MySQL Server I installed
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Freshnation2',
  database: 'futa_calculator',
  waitForConnections: true,
});

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