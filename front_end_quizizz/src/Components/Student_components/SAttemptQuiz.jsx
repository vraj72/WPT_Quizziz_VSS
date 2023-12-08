import { SHeader } from "./SHeader";
import { SNavigationBar } from "./SNavigationBar";
import { Container } from "react-bootstrap";

export function SAttemptQuiz(props){
    return(
        <>
            <SNavigationBar/>
            <Container>
                <SHeader text="Attempt Quizz"></SHeader>
            </Container>
        </>
    );
}