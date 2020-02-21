var config = {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    database: process.env.PG_DB,
    password: process.env.PG_PWD,
    port: process.env.PG_PORT,
    idleTimeoutMillis: 30000
}
const pg = require('pg')
var pool = new pg.Pool(config);

module.exports = {
    query: function (query, param, callback) {
        const sql_query = {
            text: query,
            values: param
        };
        console.log(sql_query);
        pool.connect(function(conn_err, client, done) {
            
            if(conn_err){ callback(conn_err); return; }
            client.query(sql_query, function(query_err, query_result){
                done();
                console.log(query_err)
                if (query_err) { callback(query_err); return; }
                console.log(query_result.rows);
                callback(null, query_result.rows, query_result);
            });
        });
    }
}