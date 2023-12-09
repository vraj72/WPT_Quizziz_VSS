import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { Header } from "./Header";
// import { Form } from "react-router-dom";
import { useState } from "react";
import { saveStudent } from "../services/fetchstudents";
import { NavigationBar } from './NavigationBar';

export function StudentRegistartionForm(){
    const[formData ,setFormData] = useState({Name:"",Email:"",Password:"",Mobile_number:""});
    const[issubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
            console.log(formData);
           const result = await saveStudent(formData);
           setIsSubmitted(true);
           setFormData({Name:"",Email:"",Password:"",Mobile_number:""})

           setTimeout(()=>{
                setIsSubmitted(false)
           },1500)

           console.log(result)

        }catch(erro){

        }
    }
    return(
        <>
        <NavigationBar/>

        <Container>
            <Header text="Register On Student CRUD App"></Header>

            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col lg={4}>
                        <Form.Group className="mb-3" >
                        <Form.Label>Name:</Form.Label>
                        <Form.Control value={issubmitted?formData.name:null} type="text" name="name" placeholder="Enter Name.." onChange={handleChange} />
                        </Form.Group>
                    </Col>

                    <Col lg={4}>
                        <Form.Group className="mb-3" >
                        <Form.Label>Email:</Form.Label>
                        <Form.Control value={issubmitted?formData.Email:null} type="text" name='Email' placeholder="Enter Email.." onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                
                </Row>
                <Row>
                <Col lg={4}>
                        <Form.Group className="mb-3" >
                        <Form.Label>Password:</Form.Label>
                        <Form.Control value={issubmitted?formData.Password:null} type="text" name='Password' placeholder="Enter Password.." onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                    <Col lg={4}>
                        <Form.Check type="radio" name='gender' label="Male" value='Male' onChange={handleChange}/>
                        <Form.Check type="radio" name='gender' label="Female" value='Female' onChange={handleChange}/>  
                    </Col>
                </Row>
                <Row>
                    <Col lg={3}>
                        <Button variant="primary" type='submit' name="submit" value="Register">Register</Button>
                    </Col>
                </Row>

            </Form>
            <Row className="mt-3">
                <Col lg={4}>
                    {issubmitted? <Alert variant="sucess">Teacher Registred</Alert>:null}
                    
                </Col>
            </Row>
        </Container>
        </>
    )
}