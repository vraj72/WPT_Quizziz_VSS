import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { THeader } from "./THeader";

import { loginTeacher } from "../../Services/Teacher/Teacher_APIs";
import { useNavigate } from "react-router-dom";
//import { useState } from "react";
import { TeacherLoginSchema } from "../../ValidationSchema/TeacherLoginValidations";

export function TLogin(props){

    const[formData ,setFormData] = useState({email:"",password:""});
    const [afterloginError,setafterLoginError]=useState(false);
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value});
        console.log(formData);
    }

    const handleRegister =()=>{
        navigate('/teacher-register');
    }

    const handleStudentRedirect = () =>{
        navigate('/')
    }
   

    const handleSubmit= async (e)=>{
        e.preventDefault();
       
       try{
                const result = await loginTeacher(formData);
            console.log("from login api ",result.data.message)
            //if result.data.message = invalid username or password then show alert 
            //if not coreect mesaage then navigate to studnet-dashboard
            if(result.data.message === "Logged in Succesfully"){
                localStorage.setItem('Teacher_ID' , result.data.Teacher_ID);
                 localStorage.setItem('Ttoken' , result.data.token);
                navigate('/teacher-dashboard');            
           }else{
            setafterLoginError(true);
            alert("Wrong Username Or Password")
            
           }

       }catch(error){
        console.log(error)
        setafterLoginError(true);
        
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

                  
                    <Col lg={3}>
                        <Button variant="success" onClick={handleRegister} >Dont have teacher Account? Register!</Button>
                    </Col>
                
                </Row>
                <Row className="mt-4">
                    <Col lg={1}/>
                    <Col lg={3}>
                        <Button variant="info" onClick={handleStudentRedirect} >Go to Student Page</Button>
                    </Col>
                 </Row>
            
            </Form>
            
        </Container>
        
        
    
    )
    
}