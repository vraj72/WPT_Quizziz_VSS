export function isStudentAuthenticated(){
    return getStudentToken() ? true : false;
}

export function getStudentToken(){
    return localStorage.getItem("Stoken");
}

export function Studentlogout(){
    localStorage.removeItem("Stoken");
}