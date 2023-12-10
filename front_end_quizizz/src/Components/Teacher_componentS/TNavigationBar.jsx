import { Navbar, Container, Nav, Button } from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap"
import { Teacherlogout } from "../../Utiles/Teacher_utiles/TeacherTokenUtiles";
import { useNavigate } from "react-router-dom";

export function TNavigationBar(props){
  const navigate = useNavigate();
  const handleLogout = () =>{
              Teacherlogout();
            navigate('/')}
    return(
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Quizizz</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

                <LinkContainer to="/teacher-dashboard">
                    <Nav.Link >Teacher DashBoard</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/teacher-login">
                    <Nav.Link >Teacher Login</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/teacher-register">
                    <Nav.Link >Teacher Register</Nav.Link>
                </LinkContainer>
                
            </Nav>
            <Button variant="danger" onClick={handleLogout}>Teacher LogOut</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}