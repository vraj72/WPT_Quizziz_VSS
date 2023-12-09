import { SHeader } from "./SHeader";
import { SNavigationBar } from "./SNavigationBar";
import { Container, Table, Card, Button, Row, Col , Modal , Form} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SfetchMyAttemptedQuizz, SfetchMyQuizz } from "../../Services/Student/Student_APIs";


export function SSeeQuizes(props){
    const params = useParams();
    const navigate = useNavigate();
    const[ quizz , setQuizz ] = useState([]);
    const[ Aquizz , setAQuizz ] = useState([]);

    async function SfetchMyQuizz_f(){
        try{
            const result = await SfetchMyQuizz(params.Course_ID);
            console.log(result);
            setQuizz(result);
        }catch(error){
            console.log(error);
        }
    }

    async function SfetchMyAttemptedQuizz_f(){
        try{
            const result = await SfetchMyAttemptedQuizz(params.Course_ID);
            console.log(result);
            setAQuizz(result);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        SfetchMyQuizz_f();
        SfetchMyAttemptedQuizz_f();
        
    },[]);

    const handlAttempt = (e) => {
        navigate(`/student-attempt-quiz/${e.target.name}`)
    }

    const handlResults = (e) => {
        navigate(`/student-see-quiz-results/${e.target.name}`)
    }
    return(
        <>
            <SNavigationBar/>
            <Container>
                <SHeader text="List of all Quizz available on course"></SHeader>
            </Container>


            <Container>
                    <Row xs={1} md={4} className="g-4">
                    {(quizz.length == 0)?
                    <SHeader text={"No Quizz Available to Attempt"}></SHeader>:
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
                                    
                                    <Button variant="primary" name={q.Quizz_ID} onClick={handlAttempt}>Attempt</Button> &nbsp;&nbsp;
                                </Card.Body>
                            </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>

                

                <Container className="mt-4">
                <SHeader text={"Attempted Quizz"}></SHeader>
                    <Row xs={1} md={4} className="g-4">
                    {(Aquizz.length == 0)?
                    <SHeader text={"No Quizz Attempted "}></SHeader>:
                        Aquizz.map(( q ) => (
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
                                    
                                    <Button variant="success" name={q.Quizz_ID} onClick={handlResults}>See Results</Button> &nbsp;&nbsp;
                                </Card.Body>
                            </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
        </>
    );
}