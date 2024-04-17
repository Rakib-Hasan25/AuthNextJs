import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/user.model.js'
import {NextRequest,NextResponse} from 'next/server'



connect()


export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token);

       const user=  await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})
        // gt:Date.now() means if the token expiry date is greater than the current time
        if(!user){
            return NextResponse.json({error:"Invalid token details"},{status:400})
        }

        console.log(user)

        //now user is verified
        user.isVerified = true


        //after user is verified we don't need verification token anymore
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined


        //saving in database for that await 
        await user.save()


        return NextResponse.json({message:"email verified successfully",success:true},{status:200})


    }
    catch(err:any){
        return NextResponse.json({error:err.message},{status:500})

    }
}