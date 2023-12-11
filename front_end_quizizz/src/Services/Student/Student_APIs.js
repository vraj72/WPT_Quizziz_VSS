import axios from "axios";
import { getStudentID, getStudentToken } from "../../Utiles/Student_utiles/StudentTokenUtiles";



export async function loginStudent(data){
    try {
        const response = await axios.post('http://127.0.0.1:45001/student/login',data);
        console.log("Login response : ",response)
        return response;
    } catch (error) {
        console.log(error)
    }
}


export async function registerStudent(data){
    try {
        const response = await axios.post('http://127.0.0.1:45001/student/register',data);
        console.log("Register :",response)
        return response;
    } catch (error) {
        console.log(error)
    }
}




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

export async function SfetchMyCourses(){
    try{
        console.log("token",getStudentToken(), "Student_ID", getStudentID());

        // const reposnse = await axios.get("http://127.0.0.1:45001/student/",{headers:{'Authorization': getSToken()}});
        const reposnse = await axios.post("http://127.0.0.1:45001/student/listofEnrolledCourses",{Student_ID : getStudentID(), token : getStudentToken()});
        console.log("from sserver ",reposnse)
        return reposnse.data.result;
    }catch(error){
        console.log(error)
    }
}


export async function SfetchMyUNCourses(){
    try{
        console.log("token",getStudentToken(), "Student_ID", getStudentID());

        // const reposnse = await axios.get("http://127.0.0.1:45001/student/",{headers:{'Authorization': getSToken()}});
        const reposnse = await axios.post("http://127.0.0.1:45001/student/UnenrolledList",{Student_ID : getStudentID(), token : getStudentToken()});
        console.log("from sserver UNNN::: ",reposnse)
        return reposnse.data.result;
    }catch(error){
        console.log(error)
    }
}


export async function Senroll(Course_ID){
    try{
        console.log("token",getStudentToken(), "Student_ID", getStudentID());

        // const reposnse = await axios.get("http://127.0.0.1:45001/student/",{headers:{'Authorization': getSToken()}});
        const reposnse = await axios.post("http://127.0.0.1:45001/student/enroll",{Student_ID : getStudentID(), Course_ID: Course_ID,token : getStudentToken()});
        console.log("from sserver UNNN::: ",reposnse)
        return reposnse.data.result;
    }catch(error){
        console.log(error)
    }
}



export async function SfetchMyQuizz(Course_ID){
    try{
        console.log("token",getStudentToken(), "Student_ID", getStudentID());

        // const reposnse = await axios.get("http://127.0.0.1:45001/student/",{headers:{'Authorization': getSToken()}});
        const reposnse = await axios.post("http://127.0.0.1:45001/student/ListOfQuizUnAttemptedByCourse",{Student_ID : getStudentID(), Course_ID: Course_ID});
        console.log("from sserver UNNN::: ",reposnse)
        return reposnse.data.result;
    }catch(error){
        console.log(error)
    }
}


export async function SfetchMyAttemptedQuizz(Course_ID){
    try{
        console.log("token",getStudentToken(), "Student_ID", getStudentID());

        // const reposnse = await axios.get("http://127.0.0.1:45001/student/",{headers:{'Authorization': getSToken()}});
        const reposnse = await axios.post("http://127.0.0.1:45001/student/ListOfQuizAttemptedByCourse",{Student_ID : getStudentID(), Course_ID: Course_ID});
        console.log("from sserver UNNN::: ",reposnse)
        return reposnse.data.result;
    }catch(error){
        console.log(error)
    }
}

// // export async function SfetchMyQuizzResult(){
// //         try {
// //             console.log("token",getStudentToken(), "Student_ID", getStudentID());
// //             const response = await axios.post("http://127.0.0.1:45001/student/")
// //             //response.data;
// //         } catch (error) {
// //             console.log(error);
// //         }


// }