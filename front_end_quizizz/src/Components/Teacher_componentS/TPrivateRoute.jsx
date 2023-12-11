import { isTeacherAuthenticated } from "../../Utiles/Teacher_utiles/TeacherTokenUtiles";
import { Navigate } from "react-router-dom";
export function TPrivateRoute(props){
    if(isTeacherAuthenticated()){
        return(
            <>{props.children}</>
        )
        }
       return(
            <Navigate to="/teacher-login"></Navigate>
        );
}
