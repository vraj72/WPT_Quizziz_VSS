import { isTeacherAuthenticated } from "../../Utiles/Teacher_utiles/TeacherTokenUtiles";

export function TRedirectIfLoggedIn(props){
    if(!isTeacherAuthenticated()) return props.children;
}

