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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promise_1 = __importDefault(require("mysql2/promise"));
const app = (0, express_1.default)();
const port = 3000;
const pool = promise_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: 'mayroot',
    database: 'boxboot',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield pool.query('SELECT 1 as result');
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ error: 'Error de conexión a la base de datos' });
    }
}));
app.listen(port, () => {
    console.log(`Server corriendo en http://localhost:${port}`);
});
