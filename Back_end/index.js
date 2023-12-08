import express from "express";
import { PORT_NO } from "./constants.js";
import {StatusCodes} from "http-status-codes";
import router_teacher from "./APIs/Teacher.js";
import router_student from "./APIs/Student.js";
import connectMongoDB from "./db_connection/mongo_db.js";

const app = express();
app.use(express.json());


app.use('/teacher',router_teacher);
app.use('/student',router_student);

app.get("/",(request,response)=>{
    response.status(StatusCodes.OK).send({message:"Welcome to Quizizz"});
});

app.listen(PORT_NO,()=>{
    console.log("Backend Server has started at port ",PORT_NO);
})
































// mysqlPoolConnections.getConnection(function(err, connection){
//     connection.query("show tables;", function (error, results, fields) {
//         // When done with the connection, release it.
//         connection.release();
     
//         // Handle error after the release.
//         if (error) throw error;
//         console.log(results);
//         response.status(StatusCodes.OK).send({message:"Welcome to Quizziz",results:results});

//         // Don't use the connection here, it has been returned to the pool.
//       });
// });