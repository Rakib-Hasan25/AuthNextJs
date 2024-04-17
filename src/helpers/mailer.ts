//nodemailer package

import User from "@/models/user.model";
import nodemailer from "nodemailer";

import bcryptjs from 'bcryptjs'




  

export const sendEmail = async ({email,emailType,userId}:any)=>{
    try{
      const hashedToken = await bcryptjs.hash(userId.toString(),10)
      



if(emailType=="VERIFY"){
  await User.findByIdAndUpdate(userId,
    {
      $set:{
        verifyToken:hashedToken,
      verifyTokenExpiry:new Date(Date.now()+3600000)
      // we add miliseconds
      }
      
    }
  )
  
}
else if(emailType=="RESET"){
  await User.findByIdAndUpdate(userId,
    {
      $set:{
        forgetPasswordToken:hashedToken,
        forgetPasswordTokenExpiry: new Date(Date.now()+3600000)
      }
     
    }
  )
}



//mail trap -> email testing-> inboxes->smtp settings-> integration 
// ->select nodemailer -> copy text from below
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "39f87be8e46e0f",//not here should be in env
    pass: "e88d07e305ea19"//not here 
  }
});

          const mailOptons={
            from: 'mrh803705@gmail.com', // sender address
            to: email, 
            subject: emailType==='VERIFY'?'verify your email':'reset your password', 
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType==='VERIFY'?
            "verify your email":"reset your password"} or copy and paste the 
            link below in your browser . <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>
            `, // html body
          }


          const mailResponse = await transport.sendMail(mailOptons)

          return mailResponse

    }
    catch(err:any){
        throw new Error(err.message)
    }
}