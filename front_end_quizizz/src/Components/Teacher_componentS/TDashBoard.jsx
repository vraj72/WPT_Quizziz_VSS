import { THeader } from "./THeader";
import { TNavigationBar } from "./TNavigationBar";
import { Container } from "react-bootstrap";

export function TDashBoard(props){
    return(
        <>
            <TNavigationBar/>
            <Container>
                <THeader text="Welcome to Quizizz Teacher DashBoard"></THeader>
            </Container>
        </>
    );
}