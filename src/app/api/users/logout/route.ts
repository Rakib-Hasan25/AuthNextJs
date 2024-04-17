import {connect} from '@/dbConfig/dbConfig'
import {NextRequest,NextResponse} from 'next/server'


connect()




export async function GET(request:NextRequest){
    try{
       
       const response= NextResponse.json({message:"Logout Successfully",
            success:true,
        })


        //we make cookies empty
        response.cookies.set("cookies","",{httpOnly:true,expires:new Date(0)})

        return response


    }
    catch(err:any){
        return NextResponse.json({error:err.message},{status:500})

    }
}