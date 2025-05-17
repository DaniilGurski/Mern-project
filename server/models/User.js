import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String, 
        required: [true, "Can't be empty"], 
        unique: [true, "User already exists"],
    },

    password: {
        type: String, 
        required: [true, "Can't be empty"],
        min: [4, "Min 4"],
    }
}); 

const UserModel = model("User", UserSchema); 

export default UserModel;
