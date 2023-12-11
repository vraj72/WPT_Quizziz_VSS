import { useEffect, useState } from "react";
import { Senroll, SfetchMyCourses, SfetchMyUNCourses } from "../../Services/Student/Student_APIs";
import { SHeader } from "./SHeader";
import { SNavigationBar } from "./SNavigationBar";
import { Card, Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function SDashBoard(props){
    
    const[ myCourseList , setMyCourseList ]= useState([]);
    const[ myUNCourseList , setMyUNCourseList ]= useState([]);

    const navigate = useNavigate();

    

    async function fetchMyCourses_f(){
        try{
            const result = await SfetchMyCourses();
            console.log(result);
            setMyCourseList(result);
        }catch(error){
            console.log(error);
        }
    }

    async function fetchMyUNCourses_f(){
        try{
            const result = await SfetchMyUNCourses();
            console.log("UN enrolled response from server: ",result);
            setMyUNCourseList(result);
        }catch(error){
            console.log(error);
        }
    }

    const handleOpenButtonClick =(e)=>{
        const Course_ID = e.target.name;
        console.log("clicked on ",Course_ID);
        navigate(`/student-see-quizes/${Course_ID}`);
    }

    const handleEnrollButtonClick = async (e) => { 
        const Course_ID = e.target.name;
        console.log("clicked on ",Course_ID);
        try{
            const response = await Senroll(Course_ID);
            fetchMyCourses_f();
            fetchMyUNCourses_f();

        }catch(error){
            console.log(error)
        }
         
    }


    useEffect(()=>{
        fetchMyCourses_f();
        fetchMyUNCourses_f();
    },[]);
    
    return(
        <>
            <SNavigationBar/>
            <Container className="mb-4">
                <SHeader text="Welcome to Quizizz"></SHeader>
                <h4>My Courses</h4><hr></hr>
                <Container>
                <Row xs={1} md={2} className="g-4 ">
                    {(myCourseList.length === 0)?
                    <SHeader text="No Course Enrolled Yet"></SHeader>:
                        myCourseList.map(( course) => (
                            <Col key={course.Course_ID}>
                            <Card border="success">
                                <Card.Header>Course_ID : {course.Course_ID}</Card.Header>
                                <Card.Body>
                                    <Card.Title>{course.Course_name}</Card.Title>
                                    <Card.Text>{course.description}</Card.Text>
                                    <Button variant="primary" name={course.Course_ID} onClick={handleOpenButtonClick}>Open</Button>
                                </Card.Body>
                            </Card>
                            </Col>
                        ))}
                    </Row> 
                </Container>



                
                <Container className="mt-5">
                <h4>Other Courses</h4><hr></hr>
                <Row xs={1} md={4} className="g-4">
                    {(myUNCourseList.length === 0)?
                    <SHeader text="No Course Available"></SHeader>:
                        myUNCourseList.map(( course) => (
                            <Col key={course.Course_ID}>
                            <Card border="success">
                                <Card.Header>Course_ID : {course.Course_ID}</Card.Header>
                                <Card.Body>
                                    <Card.Title>{course.Course_name}</Card.Title>
                                    <Card.Text>{course.description}</Card.Text>
                                    <Button variant="success" name={course.Course_ID} onClick={handleEnrollButtonClick}>Enroll</Button>
                                </Card.Body>
                            </Card>
                            </Col>
                        ))}
                    </Row> 
                </Container>
            </Container>
        </>
    );
}