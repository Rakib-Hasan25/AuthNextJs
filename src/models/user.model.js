import { verify } from "crypto";
import mongoose, { mongo } from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"please provide a username"],
        unique:true
    },

    email:{
        type:String,
        required:[true,"please provide a email"],
        unique:true
    },



    password:{
        type:String,
        required:[true,"please provide a password"]
    },


    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date


})

/*

when we are creating backend we do like that:
const User = mongoose.model("User", userSchema)
export default User

*/


/*
nextjs is a edgetype frame work it run on edge
for that it sometimes don't know mongodb connection 
already build or not build yet
to handle that problem---->
*/



const User = mongoose.models.users || mongoose.model("users",userSchema)

export default User
/*
in dedicated backend we always do like that mongoose.model("User",userSchema)

but in nextjs for maintaining code consistancy we become flexible 
mongoose.models.users || mongoose.model("users",userSchema)

but if we do upper way it didn't make any problem
*/




