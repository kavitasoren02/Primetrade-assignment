import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()

export const ConnectToMongo = async() => {
    const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/notes-app"
    try{
        await mongoose.connect(MONGODB_URI);
        console.log("Database connected.");
    }
    catch(error: any) {
        console.log("Connection failed to mongodb", error)
    }
}