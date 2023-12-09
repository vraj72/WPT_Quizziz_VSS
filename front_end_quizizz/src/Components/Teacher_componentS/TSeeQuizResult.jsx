import { useEffect, useState } from "react";
import { fetchAttempts } from "../../Services/Teacher/Teacher_APIs";
import { THeader } from "./THeader";
import { TNavigationBar } from "./TNavigationBar";
import { Container, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";

export function TSeeQuizResult(props){
    const params = useParams();
    const[ attempts , setAttempts ] = useState([]);

    async function fetchAttempts_f(){
        try{
            const result = await fetchAttempts(params.Quizz_ID);

            console.log(result);
            setAttempts(result);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchAttempts_f();
    },[]);

    return(
        <>
            <TNavigationBar/>
            <Container>
                <THeader text="See Quizz Results"></THeader>
                <hr></hr>
                
                    {
                        (attempts != "No attempts on Quizz yet!!" )?
                        <Container>
                        <THeader text="List Of All Attempts on Quiz"></THeader>
                        <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Student_ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Marks</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                                attempts.map((a)=>{
                                    return(
                                        <tr>
                                            <td>{a.Student_ID}</td>
                                            <td>{a.First_Name}</td>
                                            <td>{a.Last_Name}</td>
                                            <td>{a.Email}</td>
                                            <td>{a.marks}</td>
                                            <td>{(a.status==1)?"PASS":"FAIL"}</td>
                                        </tr>
                                    )

                                })
                            }
                        </tbody>
                    </Table>
                    </Container>

                    : <Container><THeader text={attempts}></THeader></Container>
                    }

            </Container>
        </>
    );
}