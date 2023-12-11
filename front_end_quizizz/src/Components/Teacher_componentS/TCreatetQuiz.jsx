import { useParams } from "react-router-dom";
import { THeader } from "./THeader";
import { TNavigationBar } from "./TNavigationBar";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useState } from "react";

export function TCreatetQuiz(props) {
    const params = useParams();
    const [quizz, setQuizz] = useState({ Quizz_ID: params.Quizz_ID, title: "", description: "", starttime: "", endtime: "", passing: "", total_marks: 0, time_in_minute: "" });
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const new_data = ({ ...quizz, [e.target.name]: e.target.value });
        setQuizz(new_data);
    }

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    
    //     // If the changed input is related to options or correct_option
    //     if (name.includes("option") || name === "correct_option") {
    //         const questionIndex = /* Identify the index of the question being edited */;
    //         const updatedQuestions = [...quizz.questions];
    
    //         // Find the question being updated
    //         const questionToUpdate = updatedQuestions[questionIndex];
    
    //         // Update the specific field based on the input name
    //         if (name.startsWith("option")) {
    //             const optionIndex = name.slice(-1).charCodeAt(0) - 65; // Convert option letter to index (A: 0, B: 1, ...)
    //             questionToUpdate.options[optionIndex] = value;
    //         } else if (name === "correct_option") {
    //             questionToUpdate.correct_option = value;
    //         }
    
    //         // Update the question in the questions array
    //         updatedQuestions[questionIndex] = questionToUpdate;
    
    //         // Update the quizz state with the modified questions array
    //         setQuizz({ ...quizz, questions: updatedQuestions });
    //     } else {
    //         // For other fields like passing percentage, time in minutes, etc.
    //         setQuizz({ ...quizz, [name]: value });
    //     }
    // }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <TNavigationBar />
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
                                <Form.Control type="number" name="passing" placeholder="Eg: 36 %" onChange={handleChange} />
                            </Form.Group>
                        </Col>

                        <Col lg={4}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Time In Minutes:</Form.Label>
                                <Form.Control type="number" name='time_in_minutes' placeholder="Eg : 10 minutes.." onChange={handleChange} />
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row>
                        <Col lg={4}>
                            <Button variant="primary" name="addMCQ" onClick={handleShow}> + Add MCQ</Button>
                        </Col>

                    </Row>
                    <Row className="mt-3">
                        <Col lg={4}>


                        </Col>
                    </Row>
                    <Col lg={4}>
                        <Button variant="primary" type='submit' name="submit" disabled>Submit</Button>
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
                            <Col sm="1">
                            <Form.Check column sm="1" type="radio" name="correct_option" value="A" onChange={handleChange} defaultChecked></Form.Check>
                            </Col>
                            <Col sm="1">   
                            <Form.Label> A. </Form.Label>
                            </Col>
                            <Col sm="10">
                                <Form.Control name="optionA" type="text" placeholder="Functions which can not be......" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Col sm="1">
                            <Form.Check column sm="1" type="radio" name="correct_option" value="B" onChange={handleChange}></Form.Check>
                            </Col>
                            <Col sm="1">   
                            <Form.Label> B. </Form.Label>
                            </Col>
                            <Col sm="10">
                                <Form.Control name="optionB" type="text" placeholder="Functions which can not be......" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Col sm="1">
                            <Form.Check column sm="1" type="radio" name="correct_option" value="C" onChange={handleChange}></Form.Check>
                            </Col>
                            <Col sm="1">   
                            <Form.Label> C. </Form.Label>
                            </Col>
                            <Col sm="10">
                                <Form.Control name="optionC" type="text" placeholder="Functions which can not be......" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Col sm="1">
                            <Form.Check column sm="1" type="radio" name="correct_option" value="D" onChange={handleChange}></Form.Check>
                            </Col>
                            <Col sm="1">   
                            <Form.Label> D. </Form.Label>
                            </Col>
                            <Col sm="10">
                                <Form.Control name="optionD" type="text" placeholder="Functions which can not be......" />
                            </Col>
                        </Form.Group>

                        {/* <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Check column sm="2" type="radio" name="correct_option" id="opt" value="B" onChange={handleChange}></Form.Check>
                            <Form.Label column sm="2">
                                Opt B.
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control name="optionB" type="text" placeholder="Functions which can not be......" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Check column sm="2" type="radio" name="correct_option" value="C" onChange={handleChange}></Form.Check>
                            <Form.Label column sm="2">
                                Opt C.
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control name="optionC" type="text" placeholder="Functions which can not be......" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Check column sm="2" type="radio" name="correct_option" value="D" onChange={handleChange}></Form.Check>
                            <Form.Label column sm="2">
                                Opt D.
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control name="optionD" type="text" placeholder="Functions which can not be......" />
                            </Col>
                        </Form.Group> */}
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