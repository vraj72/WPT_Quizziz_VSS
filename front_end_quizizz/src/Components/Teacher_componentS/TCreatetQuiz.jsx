import { useParams } from "react-router-dom";
import { THeader } from "./THeader";
import { TNavigationBar } from "./TNavigationBar";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useState } from "react";

export function TCreatetQuiz(props){
    const params = useParams();
    const[ quizz , setQuizz ] = useState({Quizz_ID : params.Quizz_ID ,title : "", description : "", starttime : "", endtime : "",passing: "", total_marks:0, time_in_minute:""});
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const new_data = ({...quizz, [e.target.name]: e.target.value});
        setQuizz( new_data);
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
       try{
            

       }catch(error){
        console.log(error)
       }
    }

    return(
        <>
        <TNavigationBar/>
        <Container>
            <THeader text="Create a New Quizz"></THeader>

            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col lg={12}>
                        <Form.Group className="mb-3" > 
                        <h2>Quizz ID : {quizz.Quizz_ID}</h2>
                        <h3>Title : {quizz.title}</h3> 
                        
                        <hr></hr>
                        
                        <h4>Description : {quizz.description}</h4>
                        <h4>Total Marks : {quizz.total_marks}</h4>
                        <hr></hr>
                        <h5>StartTime : {quizz.starttime}</h5>
                        <h5>EndTime : {quizz.endtime}</h5>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}>
                        <Form.Group className="mb-3" >
                        <Form.Label>Passing Percentage %:</Form.Label>
                        <Form.Control  type="number" name="passing" placeholder="Eg: 36 %" onChange={handleChange} />
                        </Form.Group>
                    </Col>

                    <Col lg={4}>
                        <Form.Group className="mb-3" >
                        <Form.Label>Time In Minutes:</Form.Label>
                        <Form.Control  type="number" name='time_in_minutes' placeholder="Eg : 10 minutes.." onChange={handleChange}/>
                        </Form.Group>
                    </Col>
    
                </Row>
                <Row>
                    <Col lg={4}>
                        <Button variant="primary"  name="addMCQ"  onClick={handleShow}> + Add MCQ</Button>
                    </Col>
                    
                </Row>
                <Row className="mt-3">
                <Col lg={4}>
                    
                    
                </Col>
            </Row>
            <Col lg={4}>
                        <Button variant="primary" type='submit' name="submit"   disabled>Submit</Button>
                    </Col>
            </Form>
        </Container>









                    <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Question</Form.Label>
                        <Form.Control
                            placeholder="Q1. What is Virtual Function?"
                            type="text"
                            autoFocus
                            name="question"
                        />
                        </Form.Group>
                        
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Check column sm="2" type="radio" name="correct_option"></Form.Check>
                            <Form.Label column sm="2">
                             A.
                            </Form.Label>
                            <Col sm="8">
                            
                            <Form.Control name="optionA" type="text" placeholder="Functions which can not be......" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                            Opt B.
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control name="optionB" type="text" placeholder="Functions which can not be......" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                            Opt C.
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control  name="optionC" type="text" placeholder="Functions which can not be......" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                            Opt D.
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control name="optionD" type="text" placeholder="Functions which can not be......" />
                            </Col>
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
        </>
    );
}