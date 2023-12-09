import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { THeader } from "./THeader";
import { saveTeachers } from "./fetchTeacher";

//import { useState } from "react";

export function TLogin(props){
    const[formData ,setFormData] = useState({Email:"",Password:""});
    const[issubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
            console.log(formData);
           const result = await saveTeachers(formData);
           setIsSubmitted(true);
           setFormData({Email:"",Password:""})

           setTimeout(()=>{
                setIsSubmitted(false)
           },1500)

           console.log(result)

        }catch(erro){

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
                        <Form.Control value={issubmitted?formData.name:null} type="text" name="Email" placeholder="Enter Email.." onChange={handleChange} />
                        </Form.Group>
                    </Col>

                    <Col lg={4}>
                        <Form.Group className="mb-3" >
                        <Form.Label>Password:</Form.Label>
                        <Form.Control value={issubmitted?formData.Email:null} type="Password" name='Password' placeholder="Enter Password.." onChange={handleChange}/>
                        </Form.Group>
                    </Col>
    
                </Row>
                <Row>
                    <Col lg={3}>
                        <Button variant="primary" type='submit' name="submit" value="Register">Login</Button>
                    </Col>
                </Row>
                <Row className="mt-3">
                <Col lg={4}>
                    {issubmitted? <Alert variant="sucess">Login Sucessful</Alert>:null}
                    
                </Col>
            </Row>
            
            </Form>
            
        </Container>
        
        
    
    )
    
}