import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/user.model.js'
import {NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import {sendEmail} from '@/helpers/mailer'


/*1. get the database connection
2. create a post request for registration
3. creck user already registered or not
4. if not already registered dcrypt password
5.save username, password, email or the database
6. after saving get the mongodb generated user id
7. sent an email to the user email (check mailer.ts file for more information)


*/









//get the database connection
connect ()


// localhost:3000/api/users/signup/(Post type) for file structure
export async function POST(request:NextRequest){
    try{
        //reqBody is a promise
       const reqBody= await request.json() //if we don't have "await" we will get error , 
       const {username,email,password} = reqBody
       
       
       //TODO:validation
       console.log(reqBody);



      const user=  await User.findOne({email})

      if(user){
        return NextResponse.json({
            error:"user already exists",
        },{status:400})
      }


      //hash password
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

console.log("hash password",hashedPassword)
      //save in database
      const newUser= new User({username,email,password:hashedPassword})

      const savedUser = await newUser.save();

      console.log(savedUser)
      //send verification email 
      await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})


      return NextResponse.json({
        message:"User registrated successfully",
        success:true,
        savedUser:savedUser
      })

    }
    catch(err:any){
        return NextResponse.json({error:err.message},{status:500});
    }
}