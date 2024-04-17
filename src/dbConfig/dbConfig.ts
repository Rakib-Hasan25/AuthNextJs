import mongoose, { connection } from "mongoose";


export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!)

        const connect = mongoose.connection

        // after connection there might be some problems
        connection.on('connected',()=>{
            console.log('MongoDB connected');

            //"connected" is an event 
        })
        connection.on('error',(err)=>{
            console.log('Mongo db connection error, please make sure db is up and running'+err);
            process.exit();
            //"error" is an event 
        })




    }
    catch(error){
        console.log('something went wrong in connection to DB');
        console.log(error);
    }
}