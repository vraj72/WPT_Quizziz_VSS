import mysql from "mysql"

export const mysqlPoolConnections = mysql.createPool({
    connectionLimit:5,
    host : 'localhost',
    user : 'root',
    password : 'cdac',
    database: 'Quizizz'
});


