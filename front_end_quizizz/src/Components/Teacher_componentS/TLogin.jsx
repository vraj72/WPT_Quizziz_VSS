import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { THeader } from "./THeader";
import { saveTeachers } from "./fetchTeacher";
import { loginTeacher } from "../../Services/Teacher/Teacher_APIs";

//import { useState } from "react";

export function TLogin(props){

    const[formData ,setFormData] = useState({email:"",password:""});

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value});
        console.log(formData);
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
       try{
            const result = await loginTeacher(formData);
            console.log("from login api ",result.data.message)
            //if result.data.message = invalid username or password then show alert 
            //if not coreect mesaage then navigate to studnet-dashboard

       }catch(error){
        console.log(error)
       }
    }
    
    return(
        <Container>
            
            <THeader text="Login to Quizizz AS a Teacher"></THeader>
            
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col lg={4}>
                        <Form.Group className="mb-3" >
                        <Form.Label>Email:</Form.Label>
                        <Form.Control  type="text" name="email" placeholder="Enter Email.." onChange={handleChange} />
                        </Form.Group>
                    </Col>

                    <Col lg={4}>
                        <Form.Group className="mb-3" >
                        <Form.Label>Password:</Form.Label>
                        <Form.Control  type="Password" name='password' placeholder="Enter Password.." onChange={handleChange}/>
                        </Form.Group>
                    </Col>
    
                </Row>
                <Row>
                    <Col lg={3}>
                        <Button variant="primary" type='submit' name="submit" value="Login">Login</Button>
                    </Col>
                </Row>
                <Row className="mt-3">
                <Col lg={4}>
                    {/* {issubmitted? <Alert variant="sucess">Login Sucessful</Alert>:null} */}
                    
                </Col>
            </Row>
            
            </Form>
            
        </Container>
        
        
    
    )
    
}