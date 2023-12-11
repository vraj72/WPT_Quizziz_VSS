import { SHeader } from "./SHeader";
import { Alert, Col, Container, Row, Form as BsForm, Button } from "react-bootstrap";
import { useState } from "react";
import { SNavigationBar } from './SNavigationBar';
import { Field, Formik } from "formik";
import { StudentRegistrationSchema } from "../../ValidationSchema/StudentRegisterValidation";
import { registerStudent } from "../../Services/Student/Student_APIs";
import { useNavigate } from 'react-router-dom';


export function SRegister() {

    const navigate = useNavigate();
    const [registrationError,setRegistrationError]=useState(false);

    return (
        <>
            
            <Container className="regForm">
                <SHeader text="Student Registration"></SHeader>
                <Formik initialValues={{ first_name: "", last_name: "", email: "", gender: "", mobile_No: "", pswrd: "" }}
                    validationSchema={StudentRegistrationSchema}
                    onSubmit={async (values) => {
                        try {
                            const res = "Registration Successful!"
                            const result = await registerStudent(values);
                            console.log("from registration API",result.data.message)
                            if(res == result.data.message){
                                navigate("/Student-login")
                            }else{
                                setRegistrationError(true);
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }}>

                    {
                        (Formik) => {
                            const { errors, touched, isValid, dirty, handleChange, handleSubmit } = Formik;
                            return (
                                <>
                                    <Row>
                                        <Col lg={4}>
                                            <BsForm.Group className="mb-3" id="query" >
                                                <BsForm.Label>First Name</BsForm.Label>
                                                <Field id="first" name="first_name" placeholder="First Name here" className="form-control" onChange={handleChange} />
                                                {touched.first_name && errors.first_name ? <span className="error">{errors.first_name}</span> : null}
                                            </BsForm.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={4}>
                                            <BsForm.Group className="mb-3" id="query">
                                                <BsForm.Label>Last Name</BsForm.Label>
                                                <Field id="last" name="last_name" placeholder="Last Name here" className="form-control" onChange={handleChange} />
                                                {touched.last_name && errors.last_name ? <span className="error">{errors.last_name}</span> : null}
                                            </BsForm.Group>
                                        </Col>
                                    </Row>

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
                                            <BsForm.Check
                                                type="radio"
                                                name='gender'
                                                label="Male"
                                                value='Male'
                                                onChange={handleChange} />

                                            <BsForm.Check
                                                type="radio"
                                                name='gender'
                                                label="Female"
                                                value='Female'
                                                onChange={handleChange} />

                                            {touched.gender && errors.gender ? <span className="error">{errors.gender}</span> : null}
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={4}>
                                            <BsForm.Group className="mb-3" id="query" >
                                                <BsForm.Label>Mobile number</BsForm.Label>
                                                <Field id="Mobile_Number" name="mobile_no" type="number" placeholder="Enter Mobile Number" className="form-control" onChange={handleChange} />
                                                {touched.Mobile_No && errors.Mobile_No ? <span className="error">{errors.Mobile_No}</span> : null}
                                            </BsForm.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={4}>
                                            <BsForm >
                                                <BsForm.Group className="mb-3" id="query" >
                                                    <BsForm.Label>Password</BsForm.Label>
                                                    <Field id="password" type="password" name="pswrd" placeholder="Enter Password" className="form-control" onChange={handleChange} onSubmit={Formik.handleSubmit} />
                                                    {touched.password && errors.password ? <span className="error">{errors.password}</span> : null}
                                                </BsForm.Group>
                                            </BsForm>
                                        </Col>
                                    </Row>
                                    <BsForm onSubmit={handleSubmit}>
                                        <Button variant="primary" type="submit" disabled={!(Formik.dirty && Formik.isValid)}>
                                            Register
                                        </Button>
                                    </BsForm>
                                    {registrationError?<Alert variant="danger" className="mt-3">Invalid</Alert>:null}
                                </>

                            )
                        }
                    }

                </Formik>
            </Container>
        </>
    )
}