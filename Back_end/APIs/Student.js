import { Router, request } from 'express';
import { StatusCodes } from "http-status-codes";
import mysqlConnection from '../db_connection/mysql_db.js';
import { Quizz } from '../Models/quizModel.js';
import { QuizzAttempt } from '../Models/quizAttemptModel.js';

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


/////////////////////////////attemptQuiz/////////////////////////////////
// router_student.post('/attemptQuizz',async (request,response)=>{
//     const _ID = request.body._ID;
//     try{
//         const result = Quizz.findById({_iD : _ID});
//         console.log(result);
//         response.status(StatusCodes.OK).send(result);

//     }catch(error){
//         console.log(error);
//         response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message: "Internal server Error"})
//     }
// });

router_student.post('/attemptQuizz', async(request, response)=>{
    const _ID = request.body._ID;
    try{
        const result = await Quizz.findById({_id : _ID});
        var questions =  result._doc.questions ;
        console.log("printing questions ",questions)
        var questions_without_answer = [];

        for(var i = 0 ; i<questions.length; i++){
          const q = questions[i];
           var nq = { question: q.question, options: q.options, marks : q.marks};    
            console.log("nq::: ",nq)
           questions_without_answer.push(nq);
        }

        var quizz = { ...result._doc , questions : questions_without_answer};
        console.log(quizz)
        response.status(StatusCodes.OK).send(quizz);
        
    }catch(error){
        console.log(error);
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Internal Server Error"});
    }
  
});

router_student.post('/submitQuizz', async(request, response)=>{
    const _ID = request.body._id;
    const Quizz_ID = request.body.Quizz_ID;
    const passing_percentage = request.body.passing_percentage;
    const total_marks = request.body.total_marks;
    const attempted_questions = request.body.questions;
    var marks = 0;

    try{
        const quizz = await Quizz.findOne({_id:_ID});
        console.log(quizz);
        var to_be_submitted_q = [];

       for( var i = 0 ; i < attempted_questions.length ; i++){
            var a = attempted_questions[i];
            var q = quizz.questions[i];
            console.log("aq ",a,q)
            if(q.correct_option == a.marked_option ){

                marks = marks + q.marks;
                to_be_submitted_q.push({
                    question : q.question,
                    options : q.options,
                    correct_option : q.correct_option,
                    marked_option : a.marked_option,
                    marks : q.marks,
                    marks_obtained : q.marks,
                    status : true
                })
                
            }else{

                to_be_submitted_q.push({
                    question : q.question,
                    options : q.options,
                    correct_option : q.correct_option,
                    marked_option : a.marked_option,
                    marks : q.marks,
                    marks_obtained : 0,
                    status : false
                })

            }

       }

       console.log("\n\n\n tobesubmitted :",to_be_submitted_q);


       const quizattempt = new QuizzAttempt( {
                            AID : null,
                            Quizz_ID : Quizz_ID,
                            Q_ID : _ID,
                            Obtained_marks: marks,
                            passing_percentage : passing_percentage,
                            total_marks : total_marks,
                            passing_status : (marks>(total_marks*passing_percentage*0.01))?"PASS":"FAIL",
                            questions :to_be_submitted_q
                        });
        
        console.log(quizattempt);
        
    }catch(error){
        console.log(error);
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Internal Server Error"});
    }
  
});


export default router_student;



