import { Navbar, Container, Nav, Button } from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap"
import { Studentlogout } from "../../Utiles/Student_utiles/StudentTokenUtiles";
import { useNavigate } from "react-router-dom";

export function SNavigationBar(props){
  const navigate = useNavigate();
  const handleLogout = () =>{
              Studentlogout();
            navigate('/')
  }

    return(
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Quizizz</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

                <LinkContainer to="/student-dashboard">
                    <Nav.Link >DashBoard</Nav.Link>
                </LinkContainer>

                {/* <LinkContainer to="/">
                    <Nav.Link >Students Login</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/student-register">
                    <Nav.Link >Register Student</Nav.Link>
                </LinkContainer> */}
                
            </Nav>
            <Button variant="danger" onClick={handleLogout}>LogOut</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}