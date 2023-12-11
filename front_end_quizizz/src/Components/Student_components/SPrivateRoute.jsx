import { Navigate } from "react-router-dom";
import { isStudentAuthenticated } from "../../Utiles/Student_utiles/StudentTokenUtiles";

export function SPrivateRoute(props){
    if(isStudentAuthenticated()){
        return(
       <>{props.children}</>
        )
        }
       return(
       <Navigate to="/"></Navigate>
        );
}