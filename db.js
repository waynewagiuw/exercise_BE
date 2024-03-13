const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'Wayne123',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'postgress'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};