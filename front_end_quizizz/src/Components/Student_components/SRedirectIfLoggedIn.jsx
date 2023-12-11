import { isStudentAuthenticated } from "../../Utiles/Student_utiles/StudentTokenUtiles";

export function SRedirectIfLoggedIn(props){
    if(!isStudentAuthenticated()) return props.children;
}