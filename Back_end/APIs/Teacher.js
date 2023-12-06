import  {Router} from 'express';
import {StatusCodes} from "http-status-codes";
import mysqlConnection from '../db_connection/mysql_db.js';

const router_teacher = Router();

router_teacher.get('/',(request,response)=>{
    response.status(StatusCodes.OK).send({message:"Teacher API Welcome 123..."})
});

router_teacher.post('/register',(request, response)=>{
    //insert into teacher (email, phone , paswrd) values ( ${request.email , ${request.phone}});
});


router_teacher.get('/list',(request,response)=>{

    mysqlConnection.query(`SELECT * FROM Teacher;`, (error , results,feilds)=>{
        if(error){
            console.log("Error teacher/list ",error) 
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Internal Server Error"})
            throw error;
        }
        else{
            response.send({results:results});
        }
    });
  
});

// register
// login
// createCourse 
// showMyCourses
// showEnrollementOnCourse
// createQuizz 
// showMyQuizzList (on particular course)
// showAttemptsOnQuizz







export default router_teacher;
