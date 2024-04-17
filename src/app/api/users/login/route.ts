import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/user.model.js'
import {NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"



/*
1.check email from the database
2. after finding user , check userpassword is valid or not
3. generate jsonwebtoken
4. add this token with response cookies 
5. return response



*/









connect()

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json()
        const {email,password} = reqBody
        console.log(reqBody);

       const user=  await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User does not exists"},{status:400})
        }

        console.log("user exists")


        //the password which we are giving is not hashed but in database we have hashed password
        // so we need to convert the hashed password to normal password and check with our login password
        //this work will be done using the bcryptjs
        const validPassword = await bcryptjs.compare(password,user.password)


        if(!validPassword){
            return NextResponse.json({error:"enter a valid password"},{status:400})
        }


        console.log("password is correct")
        

        const tokenData = {
            //payload
            id:user._id,
            username:user.username,
            email:user.email,
        }


     const token= await jwt.sign(tokenData, process.env.TOKEN_SECRECT!, {expiresIn:'1h'})
     
    //  process.env.TOKEN_SECRECT! (not nullableeeee)
    //  `${process.env.TOKEN_SECRECT}`



     const response = NextResponse.json({
        message:"Logged in success",
        success: true,
     })



     //for set cookies we need to install cookies package
     //but in nextjs bydefault we have that
     //httpOnly:true only server can manipulate cookies
     response.cookies.set("token",token,{httpOnly:true})

     return response



    }
    catch(err:any){
        return NextResponse.json({error:err.message},{status:500})

    }
}