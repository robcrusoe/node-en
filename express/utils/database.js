const mysql = require('mysql2');

/* Creates a connection pool */
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: ''
});

module.exports = pool.promise();
