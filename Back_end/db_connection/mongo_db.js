import mongoose from "mongoose";

const connectMongoDB = async()=>{
    try{
       await mongoose.connect('mongodb://127.0.0.1:27017/Quizizz');
       console.log("Database connection created.")
    }
    catch(error){
        console.log(error)
    }
}


connectMongoDB();
