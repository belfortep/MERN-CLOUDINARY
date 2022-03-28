import mongoose from 'mongoose';


const PostSchema = new mongoose.Schema({

    title: {type:String, required:true, trim:true},
    description:{type: String, required:true, trim:true},
    image: {url:String, public_id: String}

}, {timestamps:true});

export default mongoose.model('Post', PostSchema)
