import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { THeader } from "./THeader";
// import { Form } from "react-router-dom";
import { useState } from "react";
import { RegisterTeacher } from "../../Services/Teacher/Teacher_APIs";
import { useNavigate } from "react-router-dom";
//import { NavigationBar } from './NavigationBar';
import { TeacherRegistrationSchema } from "../../ValidationSchema/TeacherRegisterValidation";

export function TRegister(props){
    const[formData ,setFormData] = useState({Name:"",Email:"",pswrd:"",Mobile_number:""});
    //const[issubmitted, setIsSubmitted] = useState(false);
    const [loginError,setLoginError]=useState(false);
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
        console.log(formData)
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
            //console.log(formData);
           const result = await RegisterTeacher(formData);
           console.log("from register api ",result.data.message)

           if(result.data.message === "Registered Suceefully"){
                navigate('/teacher-login');            
           }else{
            setLoginError(true);
           }
           
        //    setFormData({Name:"",Email:"",pswrd:"",Mobile_number:""})

           
           }catch(error){
            console.log(error)
            setLoginError(true);
            

        }
    }
    return(
        <>
       <THeader text="Register as Teacher"></THeader>

        <Container>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col lg={4}>
                        <Form.Group className="mb-3" >
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" name="Name" placeholder="Enter Name.." onChange={handleChange} />
                        </Form.Group>
                    </Col>

                    <Col lg={4}>
                        <Form.Group className="mb-3" >
                        <Form.Label>Email:</Form.Label>
                        <Form.Control  type="text" name='Email' placeholder="Enter Email.." onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                
                </Row>
                <Row>
                <Col lg={4}>
                        <Form.Group className="mb-3" >
                        <Form.Label>Password:</Form.Label>
                        <Form.Control  type="Password" name='pswrd' placeholder="Enter Password.." onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                    <Col lg={4}>
                        <Form.Group className="mb-3" >
                        <Form.Label>Mobile_number:</Form.Label>
                        <Form.Control  type="Number" name='Mobile_number' placeholder="Enter Mobile_number.." onChange={handleChange}/>
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
                {loginError?<Alert variant="danger" className="mt-3">UserName already registered</Alert>:null}
                    
                </Col>
            </Row>
        </Container>
        </>
    )
}   