import { SHeader } from "./SHeader";
import { Col, Container, Row, Form as BsForm, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { SNavigationBar } from './SNavigationBar';
import { Field, Formik } from "formik";
import { StudentLoginSchema } from "../../ValidationSchema/StudentLoginValidation";
import { loginStudent } from "../../Services/Student/Student_APIs";
import { useNavigate } from 'react-router-dom';



export function SLogin(props) {

    const navigate = useNavigate();
    const [loginError,setLoginError]=useState(false);

    const handleRegister = (e) =>{
        navigate('/student-register');
    }

    const handleTeacherRedirect = () =>{
        navigate('/teacher-login')
    }

    return (
        <>
          
            <Container className="regForm">
                <SHeader text="Student Login"></SHeader>
                <Formik initialValues={{  email: "", password: "" }}
                    validationSchema={StudentLoginSchema}
                    onSubmit={async (values) => {

                        try {
                            const res = "Logged in Succesfully";
                            const result = await loginStudent(values);
                            console.log("from login api in s LOGIN", result,result.data.message,result.data.Student_ID)
                            if (res == result.data.message) {
                                localStorage.setItem('Student_ID' , result.data.Student_ID);
                                localStorage.setItem('Stoken' , result.data.token);
                                navigate("/student-dashboard");
                            }else{
                                setLoginError(true);
                            }
                        } catch (error) {
                            console.log(error);
                                 
                        }
                        console.log(values);
                    }}>

                    {
                        (Formik) => {
                            const { errors, touched, isValid, dirty, handleChange, handleSubmit } = Formik;
                            return (
                                <>
                                    <Row>
                                        <Col lg={4}>
                                            <BsForm.Group className="mb-3" id="query" >
                                                <BsForm.Label>Email</BsForm.Label>
                                                <Field id="email" name="email" placeholder="Enter Email here" className="form-control" onChange={handleChange} />
                                                {touched.email && errors.email ? <span className="error">{errors.email}</span> : null}
                                            </BsForm.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={4}>
                                            <BsForm >
                                                <BsForm.Group className="mb-3" id="query" >
                                                    <BsForm.Label>Password</BsForm.Label>
                                                    <Field id="password" type="password" name="password" placeholder="Enter Password" className="form-control" onChange={handleChange} onSubmit={Formik.handleSubmit} />
                                                    {touched.password && errors.password ? <span className="error">{errors.password}</span> : null}
                                                </BsForm.Group>
                                            </BsForm>
                                        </Col>
                                    </Row>

                                    <BsForm onSubmit={handleSubmit}>
                                        <Button variant="primary" type="submit" disabled={!(Formik.dirty && Formik.isValid)}>
                                            Log In
                                            
                                        </Button>

                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button variant="success" onClick={handleRegister}>Dont have account ? Register!</Button>

                                        
                                    </BsForm>
                                    {loginError?<Alert variant="danger" className="mt-3">Invalid Email or password</Alert>:null}
                                    <Row className="mt-4">
                                        <Col lg={1}/>
                                        <Col lg={3}>
                                            <Button variant="info" onClick={handleTeacherRedirect} >Go to Teacher Page</Button>
                                        </Col>
                                    </Row>
                                </>
            
                            )
                        }
                    }
                    
                </Formik>
                
            </Container>
            
        </>
    )
}