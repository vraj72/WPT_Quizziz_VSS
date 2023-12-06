import  {Router} from 'express';
import {StatusCodes} from "http-status-codes";

const router_student = Router();

router_student.get('/',(request,response)=>{
    response.status(StatusCodes.OK).send({message:"Student API Welcome..."})
});

export default router_student;



