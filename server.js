"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const promise_1 = __importDefault(require("mysql2/promise"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
dotenv_1.default.config(); // Also check current directory .env if present
let poolOptions;
if (process.env.DATABASE_URL) {
    const dbUrl = new URL(process.env.DATABASE_URL);
    poolOptions = {
        host: dbUrl.hostname,
        user: decodeURIComponent(dbUrl.username),
        password: decodeURIComponent(dbUrl.password),
        database: dbUrl.pathname.replace(/^\//, ''),
        port: Number(dbUrl.port || 3306),
        waitForConnections: true,
        multipleStatements: true,
        ssl: { rejectUnauthorized: false },
    };
}
else {
    const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
    const missingEnvVars = requiredEnvVars.filter((key) => { var _a; return !process.env[key] || ((_a = process.env[key]) === null || _a === void 0 ? void 0 : _a.trim()) === ''; });
    if (missingEnvVars.length > 0) {
        throw new Error(`Missing required environment variables: DATABASE_URL or (${missingEnvVars.join(', ')}).`);
    }
    poolOptions = Object.assign({ host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME, port: Number((_a = process.env.DB_PORT) !== null && _a !== void 0 ? _a : 3306), waitForConnections: true, multipleStatements: true }, (process.env.DB_SSL === 'true' && { ssl: { rejectUnauthorized: false } }));
}
const app = (0, express_1.default)();
const allowedOrigins = ((_b = process.env.CORS_ORIGIN) !== null && _b !== void 0 ? _b : 'http://localhost:5173,http://127.0.0.1:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
const host = (_c = process.env.HOST) !== null && _c !== void 0 ? _c : '0.0.0.0';
const port = Number((_d = process.env.PORT) !== null && _d !== void 0 ? _d : 3001);
app.disable('x-powered-by');
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin))
            return callback(null, true);
        return callback(new Error('Blocked by CORS policy'));
    },
    credentials: true,
}));
app.use(express_1.default.json());
const pool = promise_1.default.createPool(poolOptions);
let courseCache = null;
const COURSE_CACHE_TTL_MS = 1000 * 60 * 5;
function getCoursesFromDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const now = Date.now();
        if (courseCache && courseCache.expiresAt > now) {
            return courseCache.data;
        }
        const [rows] = yield pool.query(`
    SELECT d.*, r.jamb_subjects, r.olevel_subjects 
    FROM departments d
    LEFT JOIN requirements r ON d.id = r.department_id
  `);
        courseCache = {
            data: rows,
            expiresAt: now + COURSE_CACHE_TTL_MS,
        };
        return courseCache.data;
    });
}
function initDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        if (process.env.SEED_ON_START !== 'true') {
            console.log('Database seeding is disabled. Set SEED_ON_START=true to initialize from the SQL backup.');
            return;
        }
        try {
            const sqlPath = path_1.default.resolve(__dirname, './futa_backup.sql');
            if (!fs_1.default.existsSync(sqlPath)) {
                console.warn(`SQL backup not found at ${sqlPath}. Skipping seed.`);
                return;
            }
            console.log('Reading SQL backup file...');
            const sqlString = fs_1.default.readFileSync(sqlPath, 'utf8');
            yield pool.query(sqlString);
            console.log('FUTA data successfully injected into the configured database.');
        }
        catch (err) {
            console.error('Error seeding database:', err);
        }
    });
}
initDatabase();
app.get('/api/courses', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rows = yield getCoursesFromDatabase();
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database connection failed' });
    }
}));
app.listen(port, host, () => {
    console.log(`Backend API running on http://${host}:${port}`);
});
