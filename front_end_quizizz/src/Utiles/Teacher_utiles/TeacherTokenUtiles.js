export function isTeacherAuthenticated(){
    return getTeacherToken() ? true : false;
}

export function getTeacherToken(){
    return localStorage.getItem("Ttoken");
}

export function Teacherlogout(){
    localStorage.removeItem("Ttoken");
}