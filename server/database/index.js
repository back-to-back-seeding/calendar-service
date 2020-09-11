const { Pool } = require('pg');

const config = {
  host: 'localhost',
  port: 5432,
  user: 'blancagomez',
  database: 'calendar',
  password: 'blancapass',
};

const pool = new Pool(config);

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
