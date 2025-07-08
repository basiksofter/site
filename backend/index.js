import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import clientsRoutes from './routes/clients.js';
import adminRoutes from './routes/admin.js';

// Настройка окружения
dotenv.config();

const { Pool } = pkg;
const app = express();
const port = process.env.PORT || 3001;

// Подключение к PostgreSQL
const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: true
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend работает!');
});

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/admin', adminRoutes);

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
}); 