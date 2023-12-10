import * as Yup from "yup";

//import "yup-phone";


export const TeacherLoginSchema = Yup.object().shape({
    
    email: Yup.string()
    .email()
    .required("Email is required"),

    password: Yup.string()
      .required("Password is required")
      .min(4, "Password is too short - should be 4 chars minimum"),
  });
