import { Request,Response,NextFunction } from "express";
import  jwt  from "jsonwebtoken";
import { userModel } from "../models/userModel";

export interface extendReuest extends Request{
  user?:any
}

const validateJWT = async(req:extendReuest,res:Response,next:NextFunction)=>{
  const AuthorizationHeader = req.get('authorization');

  if(!AuthorizationHeader){
    res.status(403).send('authorization header was not found');
    return
  }
  const token = AuthorizationHeader.split(" ")[1];

  if(!token){
    res.status(403).send('brear token not found')
    return; 
  }
  
  jwt.verify(token,process.env.JWT_SECRET ||'',async(err,payload)=>{

    if(err){
        res.status(403).send("Invalid token")
        return
    }

    const userPayload = payload as {
      email:string,
      firstName:string,
      lastName:string,

    }
   
    const user = await userModel.findOne({email:userPayload.email})
     req.user = user;
     next();
  })   
} 

export default validateJWT