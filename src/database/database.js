import pg from 'pg';

const { Pool } = pg;

const connection = new Pool({
  user: 'postgres',
  password: '',
  host: 'localhost',
  port: 5432,
  database: '',
});

export default connection;
