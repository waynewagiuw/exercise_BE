const express = require('express');
const { Pool } = require('pg');


const app = express();

const pool = new Pool({
user: "postgres",
password: 'wayne123',
host: 'localhost',
port: 5432, 
database: 'backend',
  
});
module.exports = {
  query: (text, params) => pool.query(text, params)
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});