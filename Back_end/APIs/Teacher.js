import { Router, request } from "express";
import { StatusCodes } from "http-status-codes";
import mysqlConnection from "../db_connection/mysql_db.js";
import connectMongoDB from "../db_connection/mongo_db.js";
import { Quizz } from "../Models/quizModel.js";

const router_teacher = Router();

router_teacher.get("/", (request, response) => {
  response
    .status(StatusCodes.OK)
    .send({ message: "Teacher API Welcome 123..." });
});

router_teacher.post('/register',(request, response)=>{
  const Name = request.body.Name;
  const Email = request.body.Email;
  const pswrd = request.body.pswrd;
  const Mobile_number = request.body.Mobile_number;
  console.log(request.body);

  mysqlConnection.query(`INSERT INTO Teacher ( Name, Email , pswrd, Mobile_number )
  values( "${Name}", "${Email}", "${pswrd}", "${Mobile_number}" ); `
  ,(error, result , feilds )=>{
    if(error){
      if(error.code == 'ER_DUP_ENTRY'){
        response.status(StatusCodes.BAD_REQUEST).send({message:"Email Already Registred"});
        console.log(error);
      }else{
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Internal Server Error"});
        console.log(error);
        throw error;
      }
     
    } else {
      response.status(StatusCodes.OK).send({message:"Registered Suceefully",Teacher_ID : result.insertId ,result, feilds});
    }

  });

});

router_teacher.post("/login", (request, response) => {
  console.log(request.body);
  const email = request.body.email;
  const password = request.body.password;


  mysqlConnection.query(
    `SELECT pswrd FROM Teacher WHERE Email = "${email}"`,
    (error, results, feilds) => {
      //if query error
      if (error) {
        console.log(error);
        response
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ message: "Internal Server Error" });
        throw error;
      } else {
        //if query correct
        console.log(results);

        if (results.length == 0) {
          //query empty set return
          response
            .status(StatusCodes.BAD_REQUEST)
            .send({ message: "Invalid Username" });
        } else {
          //query returning values
          const pswrd = results[0].pswrd;
          if (password == pswrd) {
            //password chcek
            response
              .status(StatusCodes.OK)
              .send({ messge: "Logged in Succesfully" });
          } else {
            //if password does not check
            response
              .status(StatusCodes.BAD_REQUEST)
              .send({ messge: "Enter Correct password" });
          }
        }
      }
    }
  );
});



router_teacher.get("/list", (request, response) => {
  mysqlConnection.query(`SELECT * FROM Teacher;`, (error, results, feilds) => {
    if (error) {
      console.log("Error teacher/list ", error);
      response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: "Internal Server Error" });
      throw error;
    } else {
      response.send({ results: results });
    }
  });
});

router_teacher.post("/createQuizz", async (request, response) => {
  const rb = request.body;
  //creating mongo object first
  try {
    const new_quizz = new Quizz({
      Quizz_ID: null,
      time_in_minutes: null,
      passing_percentage: null,
      total_marks: null,
      questions: [],
    });
    const result_mongo = await new_quizz.save(); //saving into mongo db
    console.log(result_mongo._id);
    const _ID = result_mongo._id; //getting mongo id

    //inserting quizz into mysql with object _ID
    mysqlConnection.query(
      `INSERT INTO Quizz( Course_ID, title, description, starttime, endtime, questions_mongo_ID ) 
        values(${rb.Course_ID}, "${rb.title}", "${rb.description}", "${rb.starttime}", "${rb.endtime}", "${_ID}")`,
      (error, results, feilds) => {
        if (error) {
          console.log("Mysql Error teacher/createQuizz ", error);
          response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: "Internal Server Error" });
          throw error;
        } else {
          response
            .status(StatusCodes.CREATED)
            .send({
              message: "Quizz Created",
              _ID: _ID,
              Quizz_ID: results.insertId,
              result: results,
              feilds: feilds,
            });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

router_teacher.post("/editQuizz", async (request, response) => {
  const rb = request.body;
  const _ID = request.body._ID;
  const Quizz_ID = request.body.Quizz_ID;
  const questions = request.body.questions;
  const time_in_minutes = request.body.time_in_minutes;
  const passing_percentage = request.body.passing_percentage;
  const total_marks = request.body.total_marks;
  //editing mongo db object
  try {
    const result = await Quizz.updateOne(
      { _id: _ID },
      {
        Quizz_ID: Quizz_ID,
        questions: questions,
        time_in_minutes: time_in_minutes,
        passing_percentage: passing_percentage,
        total_marks: total_marks,
      }
    );
    console.log(result);
    response.status(StatusCodes.OK).send({message:"Quizz Updated"});
  } catch (error) {
    console.log(error);
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Internal Server Error"});
  }
});

router_teacher.get('/getQuizz', async(request, response)=>{
    const _ID = request.body._ID;
    const Quizz_ID = request.body.Quizz_ID;
    try{
        const result = await Quizz.findById({_id : _ID});
        response.status(StatusCodes.OK).send(result);
    }catch(error){
        console.log(error);
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Internal Server Error"});
    }
  
});

// register
// login
// createCourse ()
// showMyCourses
// showEnrollementOnCourse
// createQuizz (done)
// editQuizz (done)
// getQuizz (done)
// showMyQuizzList (on particular course)
// showAttemptsOnQuizz

export default router_teacher;
