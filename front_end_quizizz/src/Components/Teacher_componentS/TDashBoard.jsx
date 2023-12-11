import { useEffect, useState } from "react";
import { THeader } from "./THeader";
import { TNavigationBar } from "./TNavigationBar";
import { Card, Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { createCourse, editCourse, fetchMyCourses } from "../../Services/Teacher/Teacher_APIs";
import { useNavigate } from "react-router-dom";

export function TDashBoard(props){
    const[ myCourseList , setMyCourseList ]= useState([]);
    const[ newCourse, setNewCourse ] = useState({Course_name : null, description : null })
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    ////////////EDit/////////////
    const [Eshow, setEShow] = useState(false);
    const[ newECourse, setNewECourse ] = useState({Course_ID: "" ,ECourse_name : "", Edescription : "" })



    const handleClose = () => {
        setShow(false);
        setNewCourse({Course_name : null, description : null });    
    }
    const handleShow = () => setShow(true);

    async function fetchMyCourses_f(){
        try{
            const result = await fetchMyCourses();
            console.log(result);
            setMyCourseList(result);
        }catch(error){
            console.log(error);
        }
    }

    const handleOpenButtonClick =(e)=>{
        const Course_ID = e.target.name;
        console.log("clicked on ",Course_ID);
        navigate(`/teacher-see-quizes/${Course_ID}`);
    }

    const handleAddButton = async (e) => {
        if(newCourse.Course_name == null || newCourse.description == null || newCourse.Course_name == "" || newCourse.description == "" ) alert("Both Feilds Required")
        else{
            console.log(newCourse);
            handleClose();
            await createCourse(newCourse);
            await fetchMyCourses_f();
        }
    }

    const handleChange = (e) => {
        const new_data = ({...newCourse, [e.target.name]: e.target.value});
        setNewCourse( new_data);
    }


    //////////////////Edit???????????/

    const EhandleClose = () => {
        console.log(newECourse);
        setEShow(false);
        setNewECourse({Course_ID: "" ,ECourse_name : "", Edescription : "" });    
    }
    const EhandleShow = (e) => {
        console.log("editing :", e.target.name)
        for(var i=0; i<myCourseList.length; i++){
            if(myCourseList[i].Course_ID == e.target.name){
                setNewECourse({Course_ID : myCourseList[i].Course_ID , Edescription : myCourseList[i].description , ECourse_name : myCourseList[i].Course_name });
            }
        }
        
        console.log(newECourse);
        setEShow(true);
    }


    const EhandleAddButton = async (e) => {
        if( newECourse.ECourse_name == "" || newECourse.Edescription == "" ) alert("Both Feilds Required")
        else{
            console.log(newECourse);
            EhandleClose();
            await editCourse(newECourse);
            await fetchMyCourses_f();
        }
    }

    const EhandleChange = (e) => {
        const new_data = ({...newECourse, [e.target.name]: e.target.value});
        setNewECourse( new_data);
    }




    //////////////////Edit////////////

    useEffect(()=>{
        fetchMyCourses_f()
    },[]);
    
    return(
        <>
            <TNavigationBar/>
            <Container>
                <THeader text="Welcome to Quizizz Teacher DashBoard"></THeader>
                <h4>My Courses</h4><hr></hr>
                <Container>
                <Row xs={1} md={1} className="g-4">
                    {(myCourseList == "No Course Created")?
                    <THeader text={myCourseList}></THeader>:
                        myCourseList.map(( course) => (
                            <Col key={course.Course_ID}>
                            <Card border="success">
                                <Card.Header>Course_ID : {course.Course_ID}</Card.Header>
                                <Card.Body>
                                    <Card.Title>{course.Course_name}</Card.Title>
                                    <Card.Text>{course.description}</Card.Text>
                                    <Button variant="primary" name={course.Course_ID} onClick={handleOpenButtonClick}>Open</Button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button variant="danger" name={course.Course_ID} onClick={EhandleShow}>Edit Course Details</Button>

                                </Card.Body>
                            </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
                <div className="d-grid gap-2 mt-3">
                <Button variant="primary" size="lg" onClick={handleShow}>
                    Add Course +
                </Button>
                </div>


                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Create Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label >Course Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Eg. WPT, DBT..."
                            autoFocus
                            name="Course_name"
                            onChange={handleChange} required/>
                        </Form.Group>
                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                        <Form.Label>Enter Course Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" onChange={handleChange} required/>
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddButton}>
                        Create Course
                    </Button>
                    </Modal.Footer>
                </Modal>



{/* edit////////////////////////////////////////////////////////////////////////////////////////// */}
                <Modal show={Eshow} onHide={EhandleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Edit Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label >Course Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Eg. WPT, DBT..."
                            autoFocus
                            name="ECourse_name"
                            value={newECourse.ECourse_name}
                            onChange={EhandleChange} required/>
                        </Form.Group>
                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                        <Form.Label>Enter Course Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="Edescription" value={newECourse.Edescription} onChange={EhandleChange} required/>
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={EhandleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={EhandleAddButton}>
                        Edit Course
                    </Button>
                    </Modal.Footer>
                </Modal>
                            

            </Container>
        </>
    );
}