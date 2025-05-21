import { Schema, model } from "mongoose";

const PostSchema = new Schema({
    title: {
        type: String, 
        required: [true, "Can't be empty"], 
    },

    body: {
        type: String, 
        required: [true, "Can't be empty"],
    },

    imagePath: {
        type: String,
    }, 
}); 

const PostModel = model("Post", PostSchema); 

export default PostModel;
