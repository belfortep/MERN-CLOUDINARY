import mongoose from "mongoose";

export async function connectDB(){
    try{

        await mongoose.connect(process.env.MONGODB_URI)
        console.log('bbdd connected')
    }catch(err){
        console.log(err)
    }
}
