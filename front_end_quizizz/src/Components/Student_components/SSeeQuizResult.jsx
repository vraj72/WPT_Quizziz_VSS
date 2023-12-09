import { SHeader } from "./SHeader";
import { SNavigationBar } from "./SNavigationBar";
import { Container } from "react-bootstrap";

export function SSeeQuizResult(props){
    return(
        <>
            <SNavigationBar/>
            <Container>
                <SHeader text="Results for Quiz"></SHeader>
            </Container>
        </>
    );
}