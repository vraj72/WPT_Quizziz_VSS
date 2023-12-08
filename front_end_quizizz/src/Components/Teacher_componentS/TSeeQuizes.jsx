import { THeader } from "./THeader";
import { TNavigationBar } from "./TNavigationBar";
import { Container } from "react-bootstrap";

export function TSeeQuizes(props){
    return(
        <>
            <TNavigationBar/>
            <Container>
                <THeader text="See Quizzes on My course"></THeader>
            </Container>
        </>
    );
}