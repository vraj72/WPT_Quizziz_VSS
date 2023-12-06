import  {Router} from 'express';
import {StatusCodes} from "http-status-codes";
import mysqlConnection from '../db_connection/mysql_db.js';

const router_student = Router();

router_student.get('/',(request,response)=>{

    response.status(StatusCodes.OK).send({message:"Student API Welcome..."})
});


router_student.get('/list',(request,response)=>{

    mysqlConnection.query(`SELECT * FROM Student;`, (error , results,feilds)=>{
        if(error){
            console.log("Error student/list ",error) 
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
// showCourses
// enrollToCourse
// showMyEnrolledCourses
// listQuizzesOnCourse
// attemptQuiz
// submitQuizz
// seeAttemptedQuizz


export default router_student;



