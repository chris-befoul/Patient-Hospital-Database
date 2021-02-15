var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_kimte',
  password        : '9991',
  database        : 'cs340_kimte'
});
module.exports.pool = pool;