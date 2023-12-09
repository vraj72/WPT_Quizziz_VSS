import * as Yup from "yup";

//import "yup-phone";


export const StudentRegistrationSchema = Yup.object().shape({
    first_name:Yup.string()
    .min(2,"Must be more than one character")
    .required("Enter First Name"),

    last_name:Yup.string()
    .min(2,"Must be more than one character")
    .required("Enter Last Name"),

    email: Yup.string()
    .email()
    .required("Email is required"),

    gender: Yup.string()
    .required("Gender id Required"),

//    // mobile_no: Yup.string()
//    // .phone()
//     .required(0),

    Mobile_No: Yup.number()
    .min(10,"Check Number")
    .required("Mobile number is required"),

    password: Yup.string()
      .required("Password is required")
      .min(4, "Password is too short - should be 4 chars minimum"),
  });
