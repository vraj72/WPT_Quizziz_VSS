import { Router } from 'express';
import { StatusCodes } from "http-status-codes";
import mysqlConnection from '../db_connection/mysql_db.js';

const router_student = Router();

router_student.get('/', (request, response) => {

    response.status(StatusCodes.OK).send({ message: "Student API Welcome..." })
});

////////////////////////////////////////Login///////////////////////////////////
router_student.post('/login', (request, response) => {
    console.log(request.body);
    const email = request.body.email;
    const password = request.body.password;

    mysqlConnection.query(`SELECT pswrd FROM student WHERE Email = "${email}"`, (error, results, feilds) => {
        //if query error
        if (error) {
            console.log(error);
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Internal Server Error" })
            throw error;
        } else { //if query correct
            console.log(results);

            if (results.length == 0) { //query empty set return 
                response.status(StatusCodes.BAD_REQUEST).send({ message: "Invalid Username" });
            } else { //query returning values
                const pswrd = results[0].pswrd;
                if (password == pswrd) { //password check
                    response.status(StatusCodes.OK).send({ messge: "Logged in Succesfully" });
                } else { //if password does not check 
                    response.status(StatusCodes.BAD_REQUEST).send({ messge: "Enter Correct password" });
                }
            }
        }
    });
});


//////////////////////////Registration////////////////////////////////////
router_student.post('/register', (request, response) => {
    const { first_name, last_name, email, gender, mobile_no, pswrd } = request.body;

    mysqlConnection.query(
        `INSERT INTO student (first_name, last_name, email, gender, mobile_no, pswrd) 
        VALUES ('${first_name}', '${last_name}', '${email}', '${gender}', '${mobile_no}', '${pswrd}')`,
        (error, results, fields) => {
            if (error) {
                console.log(error);
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Internal Server Error" });
            } else {
                console.log(results);
                response.status(StatusCodes.OK).send({ message: "Registration Successful!" });
            }
        }
    );
});

//////////////////////Get a list of students////////////////////////////
router_student.get('/list', (request, response) => {

    mysqlConnection.query(`SELECT * FROM Student;`, (error, results, feilds) => {
        if (error) {
            console.log("Error student/list ", error)
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Internal Server Error" })
            throw error;
        }
        else {
            response.send({ results: results });
        }
    });

});

////////////////////Get a list of courses////////////////////////////////////

router_student.get('/clist', (request, response) => {

    mysqlConnection.query(`SELECT * FROM course;`, (error, results, feilds) => {
        if (error) {
            console.log("Error course/list ", error)
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Internal Server Error" })
            throw error;
        }
        else {
            response.send({ results: results });
        }
    });

});

/////////////////////////////Enrollment To course///////////////////////


router_student.post('/enroll',(request,response) =>{

   const Course_ID = request.body.Course_ID;
   const Student_ID = request.body.Student_ID;

   console.log(Course_ID);

    mysqlConnection.query(`Insert into enrollement (Course_ID, Student_ID, status) 
    values("${Course_ID}","${Student_ID}","0")`,(error, result, fields) => {
            if (error) {
                if (error.code=='ER_DUP_ENTRY'){
                        response.status(StatusCodes.BAD_REQUEST).send({message: "Already enrolled"})
                }
                else{
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message: "Internal server Error"})
                throw error;
                }
            }
            else{
                response.send({ results: result })
                response.status(StatusCodes.OK).send({message: "Enrollment Successful",result,fields})
            }

    });
});



////////////////////////////
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



