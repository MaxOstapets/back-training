import mongoose from "mongoose";

export async function dbConnect () {
    try{
        const connect = await mongoose.connect("mongodb+srv://someone:hello123@test1.dk3nrv3.mongodb.net/?retryWrites=true&w=majority&appName=test1")
        console.log("MONGO IS CONNECTED")
    }catch(error){
        console.log("ERROR", error.message);
    }
}