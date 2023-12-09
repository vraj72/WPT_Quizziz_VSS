import axios from "axios";
import { getTeacherID, getTeacherToken } from "../../Utiles/Teacher_utiles/TeacherTokenUtiles";

export async function fetchTeachers(){
    try{
        //console.log("token",getSToken());
        // const reposnse = await axios.get("http://127.0.0.1:45001/student/",{headers:{'Authorization': getSToken()}});
        const reposnse = await axios.get("http://127.0.0.1:45001/teacher/");
        return reposnse.data.students;
    }catch(error){
        console.log(error)
    }
}

export async function fetchMyCourses(){
    try{
        console.log("token",getTeacherToken(), "Teacher_ID", getTeacherID());
        // const reposnse = await axios.get("http://127.0.0.1:45001/student/",{headers:{'Authorization': getSToken()}});
        const reposnse = await axios.post("http://127.0.0.1:45001/teacher/listMyCourses",{Teacher_ID : getTeacherID()});
        return reposnse.data.results;
    }catch(error){
        console.log(error)
    }
}

export async function fetchMyQuizz(Course_ID){
    try{
        //console.log("token",getTeacherToken(), "Teacher_ID", getTeacherID());
        // const reposnse = await axios.get("http://127.0.0.1:45001/student/",{headers:{'Authorization': getSToken()}});
        const reposnse = await axios.post("http://127.0.0.1:45001/teacher/showMyQuizzListonCourse",{Teacher_ID : getTeacherID(), Course_ID: Course_ID});
        return reposnse.data.results;
    }catch(error){
        console.log(error)
    }
}

export async function fetchEStudents(Course_ID){
    try{
        //console.log("token",getTeacherToken(), "Teacher_ID", getTeacherID());
        // const reposnse = await axios.get("http://127.0.0.1:45001/student/",{headers:{'Authorization': getSToken()}});
        const reposnse = await axios.post("http://127.0.0.1:45001/teacher/showEnrollementOnCourse",{Teacher_ID : getTeacherID(), Course_ID: Course_ID});
        return reposnse.data.results;
    }catch(error){
        console.log(error)
    }
}


export async function fetchAttempts(Quizz_ID){
    try{
        //console.log("token",getTeacherToken(), "Teacher_ID", getTeacherID());
        // const reposnse = await axios.get("http://127.0.0.1:45001/student/",{headers:{'Authorization': getSToken()}});
        const reposnse = await axios.post("http://127.0.0.1:45001/teacher/showAttemptsOnQuizz",{Teacher_ID : getTeacherID(), Quizz_ID: Quizz_ID});
        return reposnse.data.results;
    }catch(error){
        console.log(error)
    }
}

export async function createCourse(data){
    try{
        //console.log("token",getTeacherToken(), "Teacher_ID", getTeacherID());
        // const reposnse = await axios.get("http://127.0.0.1:45001/student/",{headers:{'Authorization': getSToken()}});
        const reposnse = await axios.post("http://127.0.0.1:45001/teacher/createCourse",{Teacher_ID : getTeacherID(),...data });
        return reposnse.data.results;
    }catch(error){
        console.log(error)
    }
}

export async function createQuizz(data){
    try{
        //console.log("token",getTeacherToken(), "Teacher_ID", getTeacherID());
        // const reposnse = await axios.get("http://127.0.0.1:45001/student/",{headers:{'Authorization': getSToken()}});
        const reposnse = await axios.post("http://127.0.0.1:45001/teacher/createQuizz",{Teacher_ID : getTeacherID(),...data });
        return reposnse.data;
    }catch(error){
        console.log(error)
    }
}

