import { useState } from "react";
import { SHeader } from "./SHeader";
import { SNavigationBar } from "./SNavigationBar";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

export function SSeeQuizResult(props) {

    // const [results, setResults] = useState([]);

    // async function publishResult() {
    //     try {
    //         const data = await
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <>
            
            <Container>
                
                <Card style={{ width: '18rem' }}>
      <Card.Header>Featured</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </Card>


            </Container>
        </>
    );
}