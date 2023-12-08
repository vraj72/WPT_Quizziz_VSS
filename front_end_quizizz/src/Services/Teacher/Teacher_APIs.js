import axios from "axios";
import { getTeacherToken } from "../../Utiles/Teacher_utiles/TeacherTokenUtiles";

export async function fetchStudents(){
    try{
        //console.log("token",getSToken());
        // const reposnse = await axios.get("http://127.0.0.1:45001/student/",{headers:{'Authorization': getSToken()}});
        const reposnse = await axios.get("http://127.0.0.1:45001/student/");
        return reposnse.data.students;
    }catch(error){
        console.log(error)
    }
}

