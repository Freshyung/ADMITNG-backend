import mysql from 'mysql2/promise';
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

async function seedDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT ?? 3306),
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined
  }) as any;

  console.log('🔌 Connected. Purging old data to inject the Complete 2026/2027 Session Matrix...');

  await connection.query('SET FOREIGN_KEY_CHECKS = 0');
  await connection.query('DELETE FROM requirements');
  await connection.query('DELETE FROM departments');
  await connection.query('SET FOREIGN_KEY_CHECKS = 1');

  // THE MASTER 2026/2027 FUTA ROSTER (60 Verified Departments)
  const courses = [
    // === SCHOOL OF COMPUTING (SOC) ===
    { name: 'Computer Science', school: 'SOC', min: 180, low: 69.00, high: 76, est: false, health: false, jamb: 'English, Math, Physics, Chemistry', olevel: '5 Credits: English, Math, Physics, Chemistry, Biology' },
    { name: 'Software Engineering', school: 'SOC', min: 180, low: 63.75, high: 71, est: false, health: false, jamb: 'English, Math, Physics, Chemistry', olevel: '5 Credits: English, Math, Physics, Chemistry, Biology' },
    { name: 'Cyber Security', school: 'SOC', min: 180, low: 63.75, high: 71, est: false, health: false, jamb: 'English, Math, Physics, Chemistry', olevel: '5 Credits: English, Math, Physics, Chemistry, Biology' },
    { name: 'Information Technology', school: 'SOC', min: 180, low: 63.75, high: 71, est: false, health: false, jamb: 'English, Math, Physics, Chemistry', olevel: '5 Credits: English, Math, Physics, Chemistry, Biology' },
    { name: 'Information Systems', school: 'SOC', min: 180, low: 63.75, high: 71, est: false, health: false, jamb: 'English, Math, Physics, Chemistry', olevel: '5 Credits: English, Math, Physics, Chemistry, Biology' },
    
    // === SCHOOL OF ELECTRICAL AND SYSTEMS ENGINEERING (SESE) ===
    { name: 'Electrical & Electronics Engineering', school: 'SESE', min: 180, low: 74.37, high: 82, est: false, health: false, jamb: 'English, Math, Physics, Chemistry', olevel: '5 Credits: English, Math, Physics, Chemistry, Biology/Agric' },
    { name: 'Computer Engineering', school: 'SESE', min: 180, low: 69.62, high: 76, est: false, health: false, jamb: 'English, Math, Physics, Chemistry', olevel: '5 Credits: English, Math, Physics, Chemistry, Biology' },
    { name: 'Information & Communication Engineering', school: 'SESE', min: 180, low: 49.75, high: 57, est: false, health: false, jamb: 'English, Math, Physics, Chemistry', olevel: '5 Credits: English, Math, Physics, Chemistry, Biology' },
    { name: 'Biomedical Engineering', school: 'SESE', min: 180, low: 60.00, high: 68, est: false, health: false, jamb: 'English, Math, Physics, Chemistry', olevel: '5 Credits: English, Math, Physics, Chemistry, Biology' },

    // === SCHOOL OF INFRASTRUCTURAL, MINERALS AND MANUFACTURING ENG (SIMME) ===
    { name: 'Mechanical Engineering', school: 'SIMME', min: 180, low: 73.75, high: 80, est: false, health: false, jamb: 'English, Math, Physics, Chemistry', olevel: '5 Credits: English, Math, Physics, Chemistry, Biology' },
    { name: 'Civil Engineering', school: 'SIMME', min: 180, low: 71.87, high: 78, est: false, health: false, jamb: 'English, Math, Physics, Chemistry', olevel: '5 Credits: English, Math, Physics, Chemistry, Biology' },
    { name: 'Agricultural Engineering', school: 'SIMME', min: 180, low: 55.12, high: 62, est: false, health: false, jamb: 'English, Math, Physics, Chemistry', olevel: '5 Credits: English, Math, Physics, Chemistry, Biology' },
    { name: 'Metallurgical & Materials Engineering', school: 'SIMME', min: 180, low: 54.87, high: 61, est: false, health: false, jamb: 'English, Math, Physics, Chemistry', olevel: '5 Credits: English, Math, Physics, Chemistry, Biology' },
    { name: 'Mining Engineering', school: 'SIMME', min: 180, low: 54.75, high: 60, est: false, health: false, jamb: 'English, Math, Physics, Chemistry', olevel: '5 Credits: English, Math, Physics, Chemistry, Biology' },
    { name: 'Industrial & Production Engineering', school: 'SIMME', min: 180, low: 47.50, high: 55, est: false, health: false, jamb: 'English, Math, Physics, Chemistry', olevel: '5 Credits: English, Math, Physics, Chemistry, Biology' },
    { name: 'Chemical Engineering', school: 'SIMME', min: 180, low: 65.00, high: 72, est: false, health: false, jamb: 'English, Math, Physics, Chemistry', olevel: '5 Credits: English, Math, Physics, Chemistry, Biology' },
    
    // === COLLEGE OF HEALTH SCIENCES: SCHOOL OF BASIC MEDICAL SCIENCES (SBMS) ===
    { name: 'Medicine and Surgery (MBBS)', school: 'SBMS', min: 220, low: 78.50, high: 86, est: true, health: true, jamb: 'English, Biology, Physics, Chemistry', olevel: '5 Credits: English, Math, Biology, Physics, Chemistry (One Sitting)' },
    { name: 'Nursing Science', school: 'SBMS', min: 200, low: 72.00, high: 78, est: true, health: true, jamb: 'English, Biology, Physics, Chemistry', olevel: '5 Credits: English, Math, Biology, Physics, Chemistry' },
    { name: 'Human Anatomy', school: 'SBMS', min: 180, low: 59.50, high: 66, est: false, health: true, jamb: 'English, Biology, Physics, Chemistry', olevel: '5 Credits: English, Math, Biology, Physics, Chemistry' },
    { name: 'Physiology', school: 'SBMS', min: 180, low: 57.25, high: 64, est: false, health: true, jamb: 'English, Biology, Physics, Chemistry', olevel: '5 Credits: English, Math, Biology, Physics, Chemistry' },
    { name: 'Medical Laboratory Science', school: 'SBMS', min: 180, low: 68.00, high: 75, est: false, health: true, jamb: 'English, Biology, Physics, Chemistry', olevel: '5 Credits: English, Math, Biology, Physics, Chemistry' },
    { name: 'Public Health', school: 'SBMS', min: 180, low: 62.00, high: 69, est: false, health: true, jamb: 'English, Biology, Physics, Chemistry', olevel: '5 Credits: English, Math, Biology, Physics, Chemistry' },
    { name: 'Medical Biochemistry', school: 'SBMS', min: 180, low: 60.00, high: 68, est: false, health: true, jamb: 'English, Biology, Physics, Chemistry', olevel: '5 Credits: English, Math, Biology, Physics, Chemistry' },
    { name: 'Biomedical Technology', school: 'SBMS', min: 180, low: 47.50, high: 55, est: false, health: true, jamb: 'English, Biology, Physics, Chemistry', olevel: '5 Credits: English, Math, Biology, Physics, Chemistry' },

    // === SCHOOL OF ENVIRONMENTAL TECHNOLOGY (SET) ===
    { name: 'Architecture', school: 'SET', min: 180, low: 72.87, high: 80, est: false, health: false, jamb: 'English, Math, Physics, Chemistry/Geo/Art', olevel: '5 Credits: English, Math, Physics, and two of Chemistry, Geo, Art' },
    { name: 'Surveying and Geoinformatics', school: 'SET', min: 180, low: 64.25, high: 71, est: false, health: false, jamb: 'English, Math, Physics, Chemistry', olevel: '5 Credits: English, Math, Physics, Chemistry, Geo' },
    { name: 'Quantity Surveying', school: 'SET', min: 180, low: 57.00, high: 64, est: false, health: false, jamb: 'English, Math, Physics, Chemistry/Geo/Econs', olevel: '5 Credits: English, Math, Physics, Chemistry/Geo' },
    { name: 'Building', school: 'SET', min: 180, low: 56.62, high: 63, est: false, health: false, jamb: 'English, Math, Physics, Chemistry', olevel: '5 Credits: English, Math, Physics, Chemistry/Geo' },
    { name: 'Industrial Design', school: 'SET', min: 180, low: 53.25, high: 60, est: false, health: false, jamb: 'English, Math, Chem/Phys/Art', olevel: '5 Credits: English, Math, Art/Chem/Phys/Bio' },
    { name: 'Urban & Regional Planning', school: 'SET', min: 180, low: 52.87, high: 59, est: false, health: false, jamb: 'English, Math, Geo/Econs, One Science Subj', olevel: '5 Credits: English, Math, Geo/Econs' },
    { name: 'Estate Management', school: 'SET', min: 180, low: 47.50, high: 54, est: false, health: false, jamb: 'English, Math, Economics, One Science Subj', olevel: '5 Credits: English, Math, Economics, Science Subj' },

    // === SCHOOL OF LIFE SCIENCES (SLS) ===
    { name: 'Biochemistry', school: 'SLS', min: 180, low: 63.37, high: 69, est: false, health: false, jamb: 'English, Biology, Chemistry, Physics/Math', olevel: '5 Credits: English, Math, Biology, Chemistry, Physics' },
    { name: 'Microbiology', school: 'SLS', min: 180, low: 63.00, high: 69, est: false, health: false, jamb: 'English, Biology, Chemistry, Physics/Math', olevel: '5 Credits: English, Math, Biology, Chemistry, Physics' },
    { name: 'Biology', school: 'SLS', min: 180, low: 47.50, high: 55, est: false, health: false, jamb: 'English, Biology, Chemistry, Physics', olevel: '5 Credits: English, Math, Biology, Chemistry, Physics' },
    { name: 'Biotechnology', school: 'SLS', min: 180, low: 47.50, high: 55, est: false, health: false, jamb: 'English, Biology, Chemistry, Physics/Math', olevel: '5 Credits: English, Math, Biology, Chemistry, Physics' },

    // === SCHOOL OF PHYSICAL SCIENCE (SPS) ===
    { name: 'Mathematics', school: 'SPS', min: 180, low: 59.00, high: 66, est: false, health: false, jamb: 'English, Math, Physics, Chemistry', olevel: '5 Credits: English, Math, Physics, Chemistry, Biology' },
    { name: 'Physics', school: 'SPS', min: 180, low: 47.50, high: 55, est: false, health: false, jamb: 'English, Physics, Math, Chemistry', olevel: '5 Credits: English, Math, Physics, Chemistry, Biology' },
    { name: 'Chemistry', school: 'SPS', min: 180, low: 47.50, high: 55, est: false, health: false, jamb: 'English, Chemistry, Math, Physics', olevel: '5 Credits: English, Math, Chemistry, Physics, Biology' },
    { name: 'Statistics', school: 'SPS', min: 180, low: 47.50, high: 55, est: false, health: false, jamb: 'English, Math, Physics, Chemistry/Econs', olevel: '5 Credits: English, Math, Physics, Chemistry, Bio/Econs' },
    { name: 'Industrial Mathematics', school: 'SPS', min: 180, low: 55.00, high: 62, est: false, health: false, jamb: 'English, Math, Physics, Chemistry', olevel: '5 Credits: English, Math, Physics, Chemistry, Biology' },
    { name: 'Industrial Chemistry', school: 'SPS', min: 180, low: 55.00, high: 62, est: false, health: false, jamb: 'English, Chemistry, Math, Physics', olevel: '5 Credits: English, Math, Chemistry, Physics, Biology' },

    // === SCHOOL OF EARTH & MINERAL SCIENCES (SEMS) ===
    { name: 'Applied Geophysics', school: 'SEMS', min: 180, low: 47.50, high: 55, est: false, health: false, jamb: 'English, Math, Physics, Chemistry', olevel: '5 Credits: English, Math, Physics, Chemistry, Biology' },
    { name: 'Applied Geology', school: 'SEMS', min: 180, low: 47.50, high: 55, est: false, health: false, jamb: 'English, Math, Physics, Chemistry', olevel: '5 Credits: English, Math, Physics, Chemistry, Biology' },
    { name: 'Meteorology', school: 'SEMS', min: 180, low: 47.50, high: 55, est: false, health: false, jamb: 'English, Math, Physics, Geography', olevel: '5 Credits: English, Math, Physics, Chemistry, Geography' },
    { name: 'Marine Science & Technology', school: 'SEMS', min: 180, low: 47.50, high: 55, est: false, health: false, jamb: 'English, Math, Physics, Chemistry', olevel: '5 Credits: English, Math, Physics, Chemistry, Biology' },
    { name: 'Remote Sensing & Geosciences Info System', school: 'SEMS', min: 180, low: 47.50, high: 55, est: false, health: false, jamb: 'English, Math, Physics, Geography', olevel: '5 Credits: English, Math, Physics, Chemistry, Geography' },

    // === SCHOOL OF AGRICULTURE & AGRICULTURAL TECHNOLOGY (SAAT) ===
    { name: 'Animal Production & Health Services', school: 'SAAT', min: 180, low: 55.37, high: 62, est: false, health: false, jamb: 'English, Chemistry, Math/Physics, Agric/Bio', olevel: '5 Credits: English, Math, Chemistry, Physics, Biology' },
    { name: 'Agric Extension & Communication Technology', school: 'SAAT', min: 180, low: 47.50, high: 55, est: false, health: false, jamb: 'English, Math, Physics, Chemistry', olevel: '5 Credits: English, Math, Chemistry, Physics, Biology' },
    { name: 'Agriculture Resource Economics', school: 'SAAT', min: 180, low: 47.50, high: 55, est: false, health: false, jamb: 'English, Economics, Math, Agric/Bio/Chem', olevel: '5 Credits: English, Math, Economics, Chem, Bio/Agric' },
    { name: 'Crop Soil & Pest Management', school: 'SAAT', min: 180, low: 47.50, high: 55, est: false, health: false, jamb: 'English, Math, Chemistry, Biology', olevel: '5 Credits: English, Math, Chemistry, Physics, Biology' },
    { name: 'Ecotourism & Wildlife Management', school: 'SAAT', min: 180, low: 47.50, high: 55, est: false, health: false, jamb: 'English, Math, Biology, Chemistry', olevel: '5 Credits: English, Math, Chemistry, Physics, Biology' },
    { name: 'Fisheries & Aquaculture', school: 'SAAT', min: 180, low: 47.50, high: 55, est: false, health: false, jamb: 'English, Math, Biology, Chemistry', olevel: '5 Credits: English, Math, Chemistry, Physics, Biology' },
    { name: 'Food Science & Technology', school: 'SAAT', min: 180, low: 58.00, high: 65, est: false, health: false, jamb: 'English, Math, Physics, Chemistry', olevel: '5 Credits: English, Math, Chemistry, Physics, Biology' },
    { name: 'Forestry & Wood Technology', school: 'SAAT', min: 180, low: 47.50, high: 55, est: false, health: false, jamb: 'English, Math, Biology, Chemistry', olevel: '5 Credits: English, Math, Chemistry, Physics, Biology' },

    // === SCHOOL OF LOGISTICS AND INNOVATION TECHNOLOGY (SLIT) ===
    { name: 'Business Information Technology', school: 'SLIT', min: 180, low: 55.00, high: 62, est: false, health: false, jamb: 'English, Math, Economics, Geography/Physics', olevel: '5 Credits: English, Math, Economics, Physics, Chemistry/Bio' },
    { name: 'Project Management Technology', school: 'SLIT', min: 180, low: 53.00, high: 60, est: false, health: false, jamb: 'English, Math, Economics, Physics/Chemistry', olevel: '5 Credits: English, Math, Economics, Physics, Chemistry' },
    { name: 'Logistics and Transport Technology', school: 'SLIT', min: 180, low: 50.00, high: 58, est: false, health: false, jamb: 'English, Math, Economics, Physics/Chemistry', olevel: '5 Credits: English, Math, Economics, Physics, Chemistry' },
    { name: 'Entrepreneurship Management Tech.', school: 'SLIT', min: 180, low: 47.50, high: 55, est: false, health: false, jamb: 'English, Math, Economics, Physics/Chemistry', olevel: '5 Credits: English, Math, Economics, Physics, Chemistry' },
    { name: 'Securities & Investment Management', school: 'SLIT', min: 180, low: 47.50, high: 55, est: false, health: false, jamb: 'English, Math, Economics, Physics/Chemistry', olevel: '5 Credits: English, Math, Economics, Physics, Chemistry' },
    { name: 'Accounting Technology', school: 'SLIT', min: 180, low: 62.00, high: 69, est: false, health: false, jamb: 'English, Math, Economics, Accounting/Comm', olevel: '5 Credits: English, Math, Economics, Accounting, Physics/Chemistry' }
  ];

  console.log(`🚀 Injecting ${courses.length} verified courses into the database...`);

  for (const c of courses) {
    const [deptResult] = await connection.query(
      `INSERT INTO departments (name, school, min_jamb, range_low, range_high, is_estimated, is_health) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [c.name, c.school, c.min, c.low, c.high, c.est, c.health]
    );

    const deptId = (deptResult as any).insertId;

    await connection.query(
      `INSERT INTO requirements (department_id, jamb_subjects, olevel_subjects) 
       VALUES (?, ?, ?)`,
      [deptId, c.jamb, c.olevel]
    );
  }

  console.log('✅ Success! The comprehensive FUTA Data Engine is fully populated.');
  await connection.end();
}

seedDatabase().catch(console.error);