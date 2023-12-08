import { SHeader } from "./SHeader";
import { SNavigationBar } from "./SNavigationBar";
import { Container } from "react-bootstrap";

export function SDashBoard(props){
    return(
        <>
            <SNavigationBar/>
            <Container>
                <SHeader text="Welcome to Quizizz"></SHeader>
            </Container>
        </>
    );
}