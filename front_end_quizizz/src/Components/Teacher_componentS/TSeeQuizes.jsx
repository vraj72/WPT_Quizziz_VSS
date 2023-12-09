import { useEffect, useState } from "react";
import { THeader } from "./THeader";
import { TNavigationBar } from "./TNavigationBar";
import { Container, Table, Card, Button, Row, Col , Modal , Form} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { createQuizz, fetchEStudents, fetchMyQuizz } from "../../Services/Teacher/Teacher_APIs";

export function TSeeQuizes(props){
    const params = useParams();
    const navigate = useNavigate();
    const[ eStudents , setEStudents ] = useState([]);
    const[ quizz , setQuizz ] = useState([]);
    const[ newQuizz, setNewQuizz] = useState({Course_ID : params.Course_ID,title : null, description : null , starttime : null, endtime : null})
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setNewQuizz({Course_ID : params.Course_ID,title : null, description : null , starttime : null, endtime : null});    
    }

    const handleShow = () => setShow(true);


    async function fetchMyQuizz_f(){
        try{
            const result = await fetchMyQuizz(params.Course_ID);
            console.log(result);
            setQuizz(result);
        }catch(error){
            console.log(error);
        }
    }

    async function fetchEStudents_f(){
        try{
            const result = await fetchEStudents(params.Course_ID);

            console.log(result);
            setEStudents(result);
        }catch(error){
            console.log(error);
        }
    }

    const handleAddButton = async (e) => {
        if(newQuizz.title == null || newQuizz.description == null || newQuizz.title == "" || newQuizz.description == "" 
        || newQuizz.starttime == null || newQuizz.starttime == "" || newQuizz.endtime == null || newQuizz.endtime == "") alert("All Feilds Required")
        else{
            if( newQuizz.starttime >= newQuizz.endtime ) {alert("Start Date Can not be after End date");}
            else{
                handleClose();
                const result = await createQuizz(newQuizz);
                console.log(result);
                navigate(`/teacher-create-quiz/${result.Quizz_ID}`)
                //await fetchMyQuizz_f();
            }
        }
    }

    const handleChange = (e) => {
        const new_data = ({...newQuizz, [e.target.name]: e.target.value});
        setNewQuizz( new_data);
    }

    useEffect(()=>{
        fetchMyQuizz_f();
        fetchEStudents_f(); 
    },[]);

    const handleEdit = (e)=>{
        const Quizz_ID = e.target.name;
        console.log("clicked on ",Quizz_ID);
        navigate(`/teacher-create-quiz/${Quizz_ID}`);
    }

    const handleSeeAttempts = (e)=>{
        const Quizz_ID = e.target.name;
        console.log("clicked on ",Quizz_ID);
        navigate(`/teacher-see-quiz-results/${Quizz_ID}`);
    }


    return(
        <>
            <TNavigationBar/>
            <Container>
                <THeader text="See Enrollements and  Quizes on My course"></THeader>

                <Container>
                    <Row xs={1} md={4} className="g-4">
                    {(quizz == "No Quizz created yet!!")?
                    <THeader text={quizz}></THeader>:
                        quizz.map(( q ) => (
                            <Col key={q.Quizz_ID}>
                            <Card border="success">
                                <Card.Header>Quizz_ID : {q.Quizz_ID}</Card.Header>
                                <Card.Body>
                                    <Card.Title>Title : {q.title}</Card.Title>
                                    <Card.Text>Description : {q.description}</Card.Text>
                                    {/* <Card.Text>No of Attempts : {q.attempts}</Card.Text> */}
                                    <hr></hr>
                                    <Card.Text>StartTime : {q.starttime}</Card.Text>
                                    <Card.Text>EndTime : {q.endtime}</Card.Text>
                                    <hr></hr>
                                    <Card.Text>Total Marks : {q.total_marks}</Card.Text>
                                    <Card.Text>Passing : {q.passing}%</Card.Text>
                                    
                                    <Button variant="primary" name={q.Quizz_ID} onClick={handleEdit}>Edit</Button> &nbsp;&nbsp;
                                    <Button variant="success" name={q.Quizz_ID} onClick={handleSeeAttempts}>See Attempts</Button>
                                </Card.Body>
                            </Card>
                            </Col>
                        ))}
                    </Row>
                    <div className="d-grid gap-2 mt-3">
                    <Button variant="primary" size="lg" onClick={handleShow}>
                        Add Quizz +
                    </Button>
                    </div>
                </Container>

                
                <hr></hr>
                
                    {
                        (eStudents != "No Enrollements yet!!" )?
                        <Container>
                        <THeader text="List Of All The Enrolled Students"></THeader>
                        <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Student_ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Mobile No</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                                eStudents.map((s)=>{
                                    return(
                                        <tr>
                                            <td>{s.Student_ID}</td>
                                            <td>{s.First_Name}</td>
                                            <td>{s.Last_Name}</td>
                                            <td>{s.Email}</td>
                                            <td>
                                                {s.Mobile_no}
                                                {/* <Button variant='danger' onClick={()=>{
                                                    setSelectedRow(s.roll);
                                                    handleShow(s.roll);
                                                }}>Delete</Button> &nbsp; &nbsp; 
                                                <Button variant='primary' onClick={()=>{
                                                    setSelectedRow(s.roll);
                                                    handleEditClick(s.roll);
                                                }}>Edit</Button> */}
                                            </td>
                                        </tr>
                                    )

                                })
                            }
                        </tbody>
                    </Table>
                    </Container>

                    : <Container><THeader text={eStudents}></THeader></Container>
                    }

            </Container>



            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Create Quizz</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label >Quizz Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Eg. WPT, DBT..."
                            autoFocus
                            name="title"
                            onChange={handleChange} required/>
                        </Form.Group>

                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                        <Form.Label>Enter Quizz Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" onChange={handleChange} required/>
                        </Form.Group>

                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                        >
                        <Form.Label>Enter Start Date</Form.Label>
                        <Form.Control
                            type="date"
                            autoFocus
                            name="starttime"
                            onChange={handleChange} required/>

                        </Form.Group>

                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                        >
                        <Form.Label>Enter End Date</Form.Label>
                        <Form.Control
                            type="date"
                            autoFocus
                            name="endtime"
                            onChange={handleChange} required/>
                        </Form.Group>



                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddButton}>
                        Create Quizz
                    </Button>
                    </Modal.Footer>
                </Modal>
                            

        </>
    );
}