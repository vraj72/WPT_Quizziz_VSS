import { THeader } from "./THeader";
import { TNavigationBar } from "./TNavigationBar";
import { Container } from "react-bootstrap";

export function TCreatetQuiz(props){
    return(
        <>
        <TNavigationBar/>
        <Container>
            <THeader text="Create a New Quizz"></THeader>
        </Container>
        </>
    );
}