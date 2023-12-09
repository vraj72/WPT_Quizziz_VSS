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
router_student.get('/Studentlist', (request, response) => {

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

router_student.get('/Courselist', (request, response) => {

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

    mysqlConnection.query(`Insert into Enrollement (Course_ID, Student_ID, status) 
    values("${Course_ID}","${Student_ID}","0")`,(error, result, fields) => {
            if (error) {
                if (error.code=='ER_DUP_ENTRY'){
                        response.status(StatusCodes.BAD_REQUEST).send({message: "Already enrolled"})
                }
                else if (error.code == 'ER_NO_REFERENCED_ROW_2' ){
                    response.status(StatusCodes.BAD_REQUEST).send({message: "Course Doesn't Exist"});
                }
                else{
                    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message: "Internal server Error"})
                    throw error;
                }
            }
            else{
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
// attemptQuiz (done)
// submitQuizz (done)
// seeAttemptedQuizz (to do ) (A_ID -> mysql  `attempt_mongo_ID` mongodb-> QuizzAttempt )
//////////////////////////// ShowMyEnrolledCourses ////////////////////////////////////////////////////

router_student.post('/listofEnrolledCourses',(request,response)=>{

    const Student_ID = request.body.Student_ID;

mysqlConnection.query(`SELECT * from course where Course_Id IN (Select Course_ID from Enrollement where Student_ID="${Student_ID}")`,(error,result,fields)=>{
        if(error)
        {
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message: "Error"})
                throw error;
        }
        else{
            response.send({result : result})
        }
});
});

/////////////////////////////////////// Courses not enrolled //////////////////////////////////////////


router_student.post('/UnenrolledList',(request,response)=>{

    const Student_ID = request.body.Student_ID;

    mysqlConnection.query(`Select * from course where Course_Id NOT IN (Select Course_ID from Enrollement where Student_ID="${Student_ID}")`,(error,result,fields)=>{
        if(error)
        {
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message: "Error"})
                throw error;
        }
        else{
            response.send({result: result})
        }
    });
});

//////////////////////////////////// List Quizzez On Course ///////////////////////////////////////////


router_student.get('/QuizzlistOnCourse',(request,response)=>{

        const Course_ID = request.body.Course_ID;

        mysqlConnection.query(`Select * from Quizz where Course_ID="${Course_ID}"`,(error,result,fields)=>{
                if(error){
                    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message : "Error"})
                    throw error;
                }
                else{
                    response.send({result : result})
                }
        });
});




///////////////////////////////////////////////////////////////////////////////////////////////////////
// register (done)
// login (done)
// showCourses (done)
// enrollToCourse (done)
// showMyEnrolledCourses (done)
// listQuizzesOnCourse (done)
// attemptQuiz (done)
// submitQuizz (done)
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
        const result_f = await quizattempt.save();
        response.status(StatusCodes.OK).send({message : "Quizz submitted" ,result_f});
        
    }catch(error){
        console.log(error);
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Internal Server Error"});
    }
  
});

//// seeAttemptedQuizz (A_ID -> mysql  `attempt_mongo_ID` mongodb-> QuizzAttempt ) /////

router_student.post('/seeAttemptedQuiz',(request,response)=>{
    const Quizz_ID = request.body.Quizz_ID;
    const Student_ID = request.body.Student_ID;
    mysqlConnection.query(`select * from QuizzAttempt where Quizz_ID = ${Quizz_ID} and Student_ID = ${Student_ID};`, 
    (error, results, feilds) => {
        if (error) {
          console.log("Error /seeAttemptedQuiz ", error);
          response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Internal Server Error" });
          throw error;
        } else {
            if(results.length == 0) 
                response.status(StatusCodes.OK).send({ results: "No Attempt yet!!" });
            else{
                const AID = results[0].attempt_mongo_ID;
                console.log("AIAID : AID",AID);
                getQuizzAttempt(AID,response)
            }  
        }
      });

});

async function getQuizzAttempt(AID,response){
    try{
        const attempt = await QuizzAttempt.findOne({_id : AID});
        response.status(StatusCodes.OK).send({AID : AID, result : attempt });
    }catch(error){
        console.log(error)
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message: "Internal Server Error"})
    }
}


/////////////  Quiz List on Course Attempted /////////////////////

router_student.post('/ListOfQuizAttemptedByCourse',(request,response)=>{

            const Course_ID = request.body.Course_ID;
            const Student_ID = request.body.Student_ID;


    mysqlConnection.query(`Select * from Quizz where Course_ID = ${Course_ID}  and Quizz_ID   IN ( select Quizz_ID from QuizzAttempt where Student_ID = ${Student_ID});`,(error,result,fields)=>{

                if(error){
                    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message: "Error"})
                    throw error;
                }
                else{
                    response.send({result : result})
                }
    });
});

////////////////////////////////////////////////

router_student.post('/ListOfQuizUnAttemptedByCourse',(request,response)=>{

    const Course_ID = request.body.Course_ID;
    const Student_ID = request.body.Student_ID;

mysqlConnection.query(`Select * from Quizz where Course_ID = ${Course_ID}  and Quizz_ID NOT  IN ( select Quizz_ID from QuizzAttempt where Student_ID = ${Student_ID});`,(error,result,fields)=>{

        if(error){
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message: "Error"})
            throw error;
        }
        else{
            response.send({result : result})
        }
});
});


export default router_student;



