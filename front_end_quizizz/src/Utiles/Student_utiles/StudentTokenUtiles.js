export function isStudentAuthenticated(){
    return getStudentToken() ? true : false;
}

export function getStudentToken(){
    return localStorage.getItem("Stoken");
}
export function getStudentID(){
    return localStorage.getItem("Student_ID");
}

export function Studentlogout(){
    localStorage.removeItem("Stoken");
}