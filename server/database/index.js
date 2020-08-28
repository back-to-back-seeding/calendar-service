const mysql = require('mysql');

// For local host
// module.exports.connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : mysqlConfig.mysqlUser,
//   password : mysqlConfig.mysqlPW,
//   database : 'calendar'
// });

// For docker network
module.exports.connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'calendar',
  port     : '3306'
});