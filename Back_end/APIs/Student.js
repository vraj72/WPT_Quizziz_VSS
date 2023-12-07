import  {Router} from 'express';
import {StatusCodes} from "http-status-codes";
import mysqlConnection from '../db_connection/mysql_db.js';

const router_student = Router();

router_student.get('/',(request,response)=>{

    response.status(StatusCodes.OK).send({message:"Student API Welcome..."})
});


router_student.post('/login',(request, response)=>{
    console.log(request.body);
    const email = request.body.email;
    const password = request.body.password;

    mysqlConnection.query(`SELECT pswrd FROM student WHERE Email = "${email}"`,(error,results,feilds)=>{
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
                if( password == pswrd ){ //password check
                    response.status(StatusCodes.OK).send({messge:"Logged in Succesfully"});
                }else{ //if password does not check 
                    response.status(StatusCodes.BAD_REQUEST).send({messge:"Enter Correct password"});
                }
            }
        }
    });
});

router_student.post('/register',(request,response)=>{

        mysqlConnection.query(`INSERT INTO student (first_name, last_name, email, gender, mobile_no, password) values (${first_name},${last_name},${email},${gender},${mobile_no},${pswrd})`,(error,results,fiels)=>{
                if(error){
                    console.log(error);
                    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Internal Server Error"});
                    throw error;
                }
                else{
                   // console.log('Registration Successful!');
                    response.status(StatusCodes.OK).send({message: "Registration Successful!"});
                }
        });
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



