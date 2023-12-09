import { SHeader } from "./SHeader";
import { Col, Container, Row, Form as BsForm, Button } from "react-bootstrap";
//import { Header } from "./Header";
// import { Form } from "react-router-dom";
//import { useState } from "react";
//import { saveStudent } from "../services/fetchstudents";
import { SNavigationBar } from './SNavigationBar';
import { Field, Formik } from "formik";
import { StudentRegistrationSchema } from "../../ValidationSchema/StudentRegisterValidation";

export function SRegister() {

    return (
        <>
            <SNavigationBar />
            <Container>
                <SHeader text="Student Registration"></SHeader>
                <Formik initialValues={{ first_name: "", last_name: "", email: "", gender: "", Mobile_No: "", password: "" }}
                    validationSchema={StudentRegistrationSchema}
                    onSubmit={(values) => {
                        // api here
                        console.log(values);
                    }}>

                    {
                        (Formik) => {
                            const { errors, touched, isValid, dirty, handleChange, handleSubmit } = Formik;
                            return (
                                <>
                                    <Row>
                                        <Col lg={4}>
                                            <BsForm.Group className="mb-3" >
                                                <BsForm.Label>First Name</BsForm.Label>
                                                <Field id="first" name="first_name" placeholder="First Name here" className="form-control" onChange={handleChange} />
                                                {touched.first_name && errors.first_name ? <span className="error">{errors.first_name}</span> : null}
                                            </BsForm.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={4}>
                                            <BsForm.Group className="mb-3" >
                                                <BsForm.Label>Last Name</BsForm.Label>
                                                <Field id="last" name="last_name" placeholder="Last Name here" className="form-control" onChange={handleChange} />
                                                {touched.last_name && errors.last_name ? <span className="error">{errors.last_name}</span> : null}
                                            </BsForm.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={4}>
                                            <BsForm.Group className="mb-3" >
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
                                            <BsForm.Group className="mb-3" >
                                                <BsForm.Label>Mobile Number</BsForm.Label>
                                                <Field id="Mobile_Number" name="Mobile_No" type="number" placeholder="Enter Mobile Number" className="form-control" onChange={handleChange} />
                                                {touched.Mobile_No && errors.Mobile_No ? <span className="error">{errors.Mobile_No}</span> : null}
                                            </BsForm.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={4}>
                                            <BsForm >
                                            <BsForm.Group className="mb-3" >
                                                <BsForm.Label>Password</BsForm.Label>
                                                <Field id="password" type="password" name="password" placeholder="Enter Password" className="form-control" onChange={handleChange} onSubmit={Formik.handleSubmit} />
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
                                    </>
                                
                            )
                        }
                    }

                </Formik>
            </Container>
        </>
    )
}