var mysql      = require('mysql');
var connection = mysql.createConnection({
  host      : process.env.MYSQL_HOST,
  user      : process.env.MYSQL_USER,
  password  : process.env.MYSQL_PWD,
  database  : process.env.MYSQL_DB,
  port      : process.env.MYSQL_PORT,
  multipleStatements: true
});

module.exports = {
    query: function (query, param, callback) {
        var formatted_sql = mysql.format(query, param);
        connection.query(formatted_sql, callback);
    }
}