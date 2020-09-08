const { Pool } = require('pg');

const config = {
  user: 'blancagomez',
  database: 'calendar',
  password: '',
};

const pool = new Pool(config);

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
