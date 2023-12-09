import { Router, request, response } from "express";
import { StatusCodes } from "http-status-codes";
import mysqlConnection from "../db_connection/mysql_db.js";
import { Quizz } from "../Models/quizModel.js";

const router_teacher = Router();

/////////////////////////Welcome /////////////////////////
router_teacher.get("/", (request, response) => {
  response
    .status(StatusCodes.OK)
    .send({ message: "Teacher API Welcome 123..." });
});


////////////////////////Register////////////////////////
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

///////////////////////////Login////////////////////////////////////////
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


////////////////////////////List allTeacher //////////////////////////////////////////
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


///////////////////////////////////////CreateQuiz//////////////////////////////////
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




/////////////////////////////EditQuizz///////////////////////////////////////
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



/////////////////////////////////GetQuizz///////////////////////////////
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
/////////////////////////////////////////////////////////////
// register               (done)
// login                  (done)
// createCourse           (done)
// showMyCourses          (done)
// showEnrollementOnCourse(done)
// showMyQuizzListonCourse(done)
// createQuizz            (done)
// editQuizz              (done)
// getQuizz               (done)
// showAttemptsOnQuizz    (done)



//////////////////////////////////showMyQuizzListonCourse//////////////////////
router_teacher.post("/showEnrollementOnCourse", (request, response) => {

  const Course_ID= request.body.Course_ID;
  mysqlConnection.query(`select * from Student,Enrollement where Student.Student_ID=Enrollement.Student_ID AND Course_ID = "${Course_ID}";`, (error, results, feilds) => {
    if (error) {
      console.log("Error teacher/showEnrollementOnCourse ", error);
      response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Internal Server Error" });
      throw error;
    } else {
      if(results.length == 0) 
        response.status(StatusCodes.OK).send({ results: "No Enrollements yet!!" });
      else
        response.status(StatusCodes.OK).send({ results: results });
    }
  });
});


//////////////////////////////////showMyQuizzListonCourse//////////////////////
router_teacher.post("/showMyQuizzListonCourse", (request, response) => {

  const Course_ID= request.body.Course_ID;
  mysqlConnection.query(`select * from Quizz where Course_ID = "${Course_ID}";`, (error, results, feilds) => {
    if (error) {
      console.log("Error teacher/showMyQuizzListonCourse ", error);
      response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Internal Server Error" });
      throw error;
    } else {
      if(results.length == 0) 
        response.status(StatusCodes.OK).send({ results: "No Quizz created yet!!" });
      else
        response.status(StatusCodes.OK).send({ results: results });
    }
  });
});




////////////////////////////ShowAttempt On Quizz///////////////////////////
router_teacher.post("/showAttemptsOnQuizz", (request, response) => {
  const Quizz_ID= request.body.Quizz_ID;
  mysqlConnection.query(`select AID, QuizzAttempt.Student_ID , First_Name, Last_Name, Email, marks, status, attempt_mongo_ID 
  from Student, QuizzAttempt where Student.Student_ID=QuizzAttempt.Student_ID and Quizz_ID = "${Quizz_ID}";`, (error, results, feilds) => {
    if (error) {
      console.log("Error teacher/showAttemptsOnQuizz ", error);
      response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Internal Server Error" });
      throw error;
    } else {
      if(results.length == 0) 
        response.status(StatusCodes.OK).send({ results: "No attempts on Quizz yet!!" });
      else
        response.status(StatusCodes.OK).send({ results: results });
    }
  });
});


//////////////////////////////listMycourse//////////////////////////
router_teacher.post("/listMyCourses", (request, response) => {
  const Teacher_ID= request.body.Teacher_ID;
  mysqlConnection.query(`SELECT * FROM course where Teacher_ID = "${Teacher_ID}";`, (error, results, feilds) => {
    if (error) {
      console.log("Error teacher/listmycourse ", error);
      response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Internal Server Error" });
      throw error;
    } else {
      if(results.length == 0) 
        response.status(StatusCodes.OK).send({ results: "No Course Created" });
      else
        response.status(StatusCodes.OK).send({ results: results });
    }
  });
});


////////////////////////CreateCourse///////////////////////////
router_teacher.post('/createCourse',(request, response)=>{
  const Course_name = request.body.Course_name;
  const description = request.body.description;
  const Teacher_ID = request.body.Teacher_ID;
  console.log(request.body);

  mysqlConnection.query(`INSERT INTO course ( Course_name, description, Teacher_ID  )
  values( "${Course_name}", "${description}", ${Teacher_ID} ); `
  ,(error, result , feilds )=>{
    if(error){
      
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Internal Server Error"});
        console.log(error);
        throw error;
      
     
    } else {
      response.status(StatusCodes.OK).send({message:"Course Created Succesfully",Course_ID : result.insertId ,result, feilds});
    }

  });

});



// create course API
router_teacher.post(`/CreateCourse`,async(request,response)=>{
    console.log(request.body);
    const Course_name = request.body.Course_name;
    const description = request.body.description;
    const Teacher_ID  = request.body.Teacher_ID;

    mysqlConnection.query(`INSERT INTO course(Course_name,description,Teacher_ID)values("${Course_name}","${description}",${Teacher_ID})`,(error, results , fields)=>{
      if(error){
        console.log(error)
        if(error.code == 'ER_DUP_ENTRY'){
          response.status(StatusCodes.BAD_REQUEST).send({message:"Course Already Exists"});
          console.log(error);
        }else{
          response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Internal Server Error"});
          console.log(error);
          throw error;
        }
      }else{
        response.status(StatusCodes.OK).send({message:"Course Created Successfully",results, fields});

      }
    })
})

// Show My courses API
router_teacher.get(`/ShowCourses`,async(request,response)=>{
    console.log(request.body)
    const Teacher_ID = request.body.Teacher_ID;

    mysqlConnection.query(`SELECT * FROM Course WHERE Teacher_ID = "${Teacher_ID}"`,(error,result,fields)=>{
        if(error)
        {
          response.status(StatusCodes.BAD_REQUEST).send({message:"No such Data exists",results,fields})
          console.log(error)
          
        }
        else
        {
          response.status(StatusCodes.OK).send({message:"Courses Fetched Succesfully",result, fields});
        }

    });
});

//show enrollment on courses
router_teacher.get(`/ShowEnrolledCourses`, async(request,response)=>{
  console.log(request.body)
  const Teacher_ID = request.body.Teacher_ID

  mysqlConnection.query(`SELECT Course_name FROM Course WHERE IN(SELECT Course_ID FROM Enrollement WHERE Student_ID="${Teacher_ID}")`,(error , result , fields)=>{

    if(error)
    {
      response.status(StatusCodes.BAD_REQUEST).send({message : "---",results,fields})
    }
    else
    {
      response.status(StatusCodes.OK).send({message:"Opertion Successful",results,fields});
    }
  }) // ASK VIRAJ ABOUT THIS QUERY
})


//SHOW MYQUIZ API
router_teacher.get("/showMyQuizzList", async(request,response)=>{
  console.log(request.body)
  const Course_ID = request.body.Course_ID;

  mysqlConnection.query(`SELECT title from quizz WHERE Course_ID="${Course_ID}"`,(error,results,field)=>{
    if(error)
    {
      response.status(StatusCodes.BAD_REQUEST).send({message : "could not find data",results})
    }
    else
    {
      response.status(StatusCodes.OK).send({message:"Data Fetched successfully",results,fields})
    }
  })
})


//showAttemptsOnQuiz
router_teacher.get("/showAttemptsOnQuiz",async(request,response)=>{
const Quizz_ID = request.body.Quizz_ID

mysqlConnection.query(`SELECT * FROM QuizzAttempt WHERE attempt_mongo_ID="${Quizz_ID}"`,(error,results,fields)=>{
  if(error)
  {
    response.status(StatusCodes.BAD_REQUEST).send({message:"Such data does not exists",results,fields})
  }
  else{
    response.status(StatusCodes.OK).send({message:"Data fetched succesfully",results,fields})

  }


})

})








// register
// login
// createCourse (done)
// showMyCourses (inprocess)
// showEnrollementOnCourse
// createQuizz (done)
// editQuizz (done)
// getQuizz (done)
// showMyQuizzList (on particular course) (shubham c id input)
// showAttemptsOnQuiz(shubham  q id input)


export default router_teacher;
