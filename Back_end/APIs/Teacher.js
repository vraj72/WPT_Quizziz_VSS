import  {Router} from 'express';
import {StatusCodes} from "http-status-codes";

const router_teacher = Router();

router_teacher.get('/',(request,response)=>{
    response.status(StatusCodes.OK).send({message:"Teacher API Welcome..."})
});

router_teacher.get('/list',(request,response)=>{
    response.status(StatusCodes.OK).send({message:"sendline list"})

});

export default router_teacher;



