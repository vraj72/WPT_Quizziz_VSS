import express from "express";
import { PORT_NO } from "./constants.js";
import {StatusCodes} from "http-status-codes";
import mysql from "mysql"
import mongoose from "mongoose";

const app = express();
app.use(express.json());

const mysqlPoolConnections =() => mysql.createPool({
    connectionLimit:5,
    host : 'localhost',
    user : 'root',
    password : 'cdac',
    database: 'Quizizz'
});

const connectMongoDB = async()=>{
    try{
       await mongoose.connect('mongodb://127.0.0.1:27017/Quizizz');
       console.log("Database connection created.")
    }
    catch(error){
        console.log(error)
    }
}



app.get("/",(request,response)=>{
    mysqlPoolConnections.getConnection(function(err, connection){
        connection.query("show tables;", function (error, results, fields) {
            // When done with the connection, release it.
            connection.release();
         
            // Handle error after the release.
            if (error) throw error;
            console.log(results);
            response.status(StatusCodes.OK).send({message:"Welcome to Quizziz",results:results});

            // Don't use the connection here, it has been returned to the pool.
          });
    });
});

app.listen(PORT_NO,()=>{
    connectMongoDB();
    mysqlPoolConnections();
    console.log("Backend Server has started at port ",PORT_NO);
})

