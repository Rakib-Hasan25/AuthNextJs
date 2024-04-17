import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/user.model.js'
import {NextRequest,NextResponse} from 'next/server'
import { getDataFromToken } from '@/helpers/getDataFromToken'


connect()

export async function POST(request:NextRequest){
    try{
       
        //extract data from token 
        const userId=await getDataFromToken(request)

        const user = await User.findOne({_id: userId}).select("-password") //not taken password


        if(!user){
            return NextResponse.json({error:"user is not found"},{status:500})
        }

        return NextResponse.json({
            message:"User found",
            data:user
        })


    }
    catch(err:any){
        return NextResponse.json({error:err.message},{status:500})

    }
}