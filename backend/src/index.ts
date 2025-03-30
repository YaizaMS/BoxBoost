import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const port = 3000;

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mayroot',
  database: 'boxboot',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 as result');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error de conexión a la base de datos' });
  }
});

app.listen(port, () => {
  console.log(`Server corriendo en http://localhost:${port}`);
});
