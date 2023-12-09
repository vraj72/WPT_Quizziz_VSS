import axios from "axios";
import { getTeacherToken } from "../../Utiles/Teacher_utiles/TeacherTokenUtiles";

export async function fetchTeachers(){
    try{
        console.log("token",getTeacherToken());
        const reposnse = await axios.get("http://127.0.0.1:45001/student",{headers:{'Authorization': getTeacherToken()}});
        return reposnse.data.Teachers;
    }catch(error){
        console.log(error)
    }
}

export async function saveTeachers(TeachersData){
    try{
        console.log("token",getTeacherToken());

        const reposnse = await axios.post("http://127.0.0.1:45001/student",TeachersData,{headers:{'Authorization': getTeacherToken()}});
        return reposnse.data;
    }catch(error){
        console.log(error)
    }
}


export async function deleteTeachers(Email){
    try{
        console.log("token",getTeacherToken());

        const response = await axios.delete(`http://127.0.0.1:45001/student/${Email}`,{headers:{'Authorization': getTeacherToken()}});
        return response;
    }catch(error){
        console.log(error)
    }
}


export async function fetchTeachesrByEmail(Email){
    try{
        console.log("token",getTeacherToken());

        const response = await axios.get(`http://127.0.0.1:45001/student/${Email}`,{headers:{'Authorization': getTeacherToken()}});
        console.log(response)
        return response.data.Teachers;
    }catch(error){
        console.log(error)
    }
}



export async function updateTeachersByEmail(Email, data){
    try{
        console.log("token",getTeacherToken());

        const response = await axios.put(`http://127.0.0.1:45001/student/${Email}`,data,{headers:{'Authorization': getTeacherToken()}});
        console.log(response)
        return response;
    }catch(error){
        console.log(error)
    }
}


export async function adminLogin(credentials){
    try{
        const response = await axios.post(`http://127.0.0.1:45001/admin/login`,credentials);
        console.log(response)
        return response;
    }catch(error){
        console.log(error)
    }
}