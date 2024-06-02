import { Pool } from 'pg';
require('dotenv').config()

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'your_database_name',
  password: process.env.DB_PASSWORD || 'your_password',
  port: parseInt('5432', 10),
});

pool.on('connect', () => {
  console.log('Conectado ao banco de dados!');
});

export default pool;