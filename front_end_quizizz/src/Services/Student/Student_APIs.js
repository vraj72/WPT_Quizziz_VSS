import axios from "axios";
import { getStudentToken } from "../../Utiles/Student_utiles/StudentTokenUtiles";

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

