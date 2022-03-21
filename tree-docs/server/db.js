const mysql = require('mysql');
const dbConfig = require('./db.config.js');

const con = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    port: dbConfig.port
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;