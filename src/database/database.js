/* eslint-disable radix */
/* eslint-disable no-console */
import pg from 'pg';

const { Pool } = pg;

const connection = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PASSWORD),
  database: process.env.DB_DATABASE,
});

console.log('Using database:', process.env.DB_DATABASE);

export default connection;
