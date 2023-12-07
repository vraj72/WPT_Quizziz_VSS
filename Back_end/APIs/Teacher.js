import  {Router} from 'express';
import {StatusCodes} from "http-status-codes";
import mysqlConnection from '../db_connection/mysql_db.js';

const router_teacher = Router();

router_teacher.get('/',(request,response)=>{
    response.status(StatusCodes.OK).send({message:"Teacher API Welcome 123..."})
});


router_teacher.post('/login',(request, response)=>{
    console.log(request.body);
    const email = request.body.email;
    const password = request.body.password;

    mysqlConnection.query(`SELECT pswrd FROM Teacher WHERE Email = "${email}"`,(error,results,feilds)=>{
        //if query error
        if(error){
            console.log(error);
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Internal Server Error"})
            throw error;
        }else{ //if query correct
            console.log(results);

            if( results.length == 0 ){ //query empty set return 
                response.status(StatusCodes.BAD_REQUEST).send({message:"Invalid Username"});
            }else{ //query returning values
                const pswrd = results[0].pswrd;
                if( password == pswrd ){ //password chcek
                    response.status(StatusCodes.OK).send({messge:"Logged in Succesfully"});
                }else{ //if password does not check 
                    response.status(StatusCodes.BAD_REQUEST).send({messge:"Enter Correct password"});
                }
            }
        }
    });
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
