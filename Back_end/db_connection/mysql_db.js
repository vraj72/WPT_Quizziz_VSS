import mysql from "mysql"

 const mysqlConnection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'cdac',
    database: 'Quizizz'
});

export default mysqlConnection;

