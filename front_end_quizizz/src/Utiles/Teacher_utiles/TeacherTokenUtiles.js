export function isTeacherAuthenticated(){
    return getTeacherToken() ? true : false;
}

export function getTeacherToken(){
    return localStorage.getItem("Ttoken");
}

export function getTeacherID(){
    return localStorage.getItem("Teacher_ID");
}

export function Teacherlogout(){
    localStorage.removeItem("Ttoken");
}