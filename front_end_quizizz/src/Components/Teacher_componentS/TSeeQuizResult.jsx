import { THeader } from "./THeader";
import { TNavigationBar } from "./TNavigationBar";
import { Container } from "react-bootstrap";

export function TSeeQuizResult(props){
    return(
        <>
            <TNavigationBar/>
            <Container>
                <THeader text="See Quizz Results"></THeader>
            </Container>
        </>
    );
}