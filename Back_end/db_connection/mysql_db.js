import mysql from "mysql"
import { mysql_config } from "./mysql_config.js";
 const mysqlConnection = mysql.createConnection(mysql_config);

export default mysqlConnection;

