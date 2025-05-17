import UserModel from "../models/User.js";
import bcrypt from "bcrypt";

export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    let errors = { username: "", password: "" };
    
    const userDoc = await UserModel.findOne({ username }); 
    
    if (!userDoc) {
        errors.username = "User not found";
        return res.status(400).json(errors);
    }
    
    const isMatch = await bcrypt.compare(password, userDoc.password);

    if (!isMatch) {
        errors.password = "Invalid credentials"
        return res.status(400).json(errors);
    }

    return res.status(200).json(userDoc);
    // Send JWT token
}