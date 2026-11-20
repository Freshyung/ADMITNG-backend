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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("pg");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
dotenv_1.default.config();
// Parse PostgreSQL NUMERIC(5,2) (OID 1700) as float so range_low & range_high stay numbers
pg_1.types.setTypeParser(1700, (val) => parseFloat(val));
if (!process.env.DATABASE_URL || process.env.DATABASE_URL.trim() === '') {
    throw new Error('Missing required environment variable: DATABASE_URL. Set it in .env locally and in Render Environment Variables.');
}
const dbUrl = new URL(process.env.DATABASE_URL);
dbUrl.searchParams.delete('sslmode');
const pool = new pg_1.Pool({
    connectionString: dbUrl.toString(),
    ssl: { rejectUnauthorized: false },
});
const app = (0, express_1.default)();
const allowedOrigins = ((_a = process.env.CORS_ORIGIN) !== null && _a !== void 0 ? _a : 'http://localhost:5173,http://127.0.0.1:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
const host = (_b = process.env.HOST) !== null && _b !== void 0 ? _b : '0.0.0.0';
const port = Number((_c = process.env.PORT) !== null && _c !== void 0 ? _c : 3001);
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
let courseCache = null;
const COURSE_CACHE_TTL_MS = 1000 * 60 * 5;
function getCoursesFromDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const now = Date.now();
        if (courseCache && courseCache.expiresAt > now) {
            return courseCache.data;
        }
        const { rows } = yield pool.query(`
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
    });
}
app.get('/api/health', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pool.query('SELECT 1');
        res.json({ status: 'ok', database: 'postgresql' });
    }
    catch (error) {
        console.error('Health check failed:', error);
        res.status(500).json({ status: 'error', database: 'disconnected' });
    }
}));
app.get('/api/courses', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
