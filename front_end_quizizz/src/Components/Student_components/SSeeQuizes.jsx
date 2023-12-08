import { SHeader } from "./SHeader";
import { SNavigationBar } from "./SNavigationBar";
import { Container } from "react-bootstrap";

export function SSeeQuizes(props){
    return(
        <>
            <SNavigationBar/>
            <Container>
                <SHeader text="List of all Quizz available on course"></SHeader>
            </Container>
        </>
    );
}