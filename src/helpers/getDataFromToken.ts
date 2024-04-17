import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'



export const getDataFromToken = (request:NextRequest)=>{
    try{
        //we extract the token from the cookies but this token is not decoded
        const token = request.cookies.get("token")?.value || ""

        //we are decoding the token
       const decodedToken:any= jwt.verify(token,process.env.TOKEN_SECRECT!)

       //in decoded token we get the payload

       return decodedToken.id 
    }
    catch(err:any){
        throw new Error(err.message)
    }

}