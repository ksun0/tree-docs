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

    con.query('CREATE DATABASE IF NOT EXISTS treedocs;');
    con.query('USE treedocs;');
    con.query('CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT, username varchar(30), email varchar(255), age int, PRIMARY KEY(id));', function(error, result, fields) {
        console.log(result);
    });
    con.query(`SELECT * FROM treedocs.users`, function(err, result, fields) {
        if (err) {
            console.log(err);
        }
        if (result) {
            console.log(result);
        }
    });
    con.end();
});