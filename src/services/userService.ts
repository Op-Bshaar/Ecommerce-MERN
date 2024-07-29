import { userModel } from "../models/userModel"
import bcyrpt from "bcrypt"
import jwt from 'jsonwebtoken'

interface registerDto{
    firstName:string,
    lastName:string,
    email:string,
    password:string
}

export const register = async({firstName,lastName,email,password}:registerDto)=>{

    const findUser = await userModel.findOne({email})

    if(findUser){
        return {data:"oops... user already found!",statusCode:404}
    }
    
    const hashPassword = await bcyrpt.hash(password,10)

    const newUser = new userModel({firstName,lastName,email,password:hashPassword})
    await newUser.save()

    return {data:genrateJwt({email,firstName,lastName}),statusCode:200}
}

interface loginDto{
    email:string,
    password:string
}

export const login = async({email,password}:loginDto)=>{

    const findUser = await userModel.findOne({email})

    if(!findUser){
        return {data:"oops... user or email not found!",statusCode:404}
    }
    
    const matchPassword = await bcyrpt.compare(password,findUser.password)
    
    if(matchPassword){
        return {data:genrateJwt({email,firstName:findUser.firstName,lastName:findUser.lastName}),statusCode:200}
    }
    
    return {data:{message:"oops... user or email not found!"},statusCode:400}

}

const genrateJwt=(data:any)=>{
  return jwt.sign(data, process.env.JWT_SECRET ||'')
}