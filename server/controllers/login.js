import UserModel from "../models/User.js";
import bcrypt from "bcrypt";

export const postLogin = async (req, res) => {
    const { username, password } = req.body;

    const userDoc = await UserModel.findOne({ username }); 

    if (!userDoc) {
        return res.status(400).json("User not found");
    }

    const isMatch = await bcrypt.compare(password, userDoc.password);

    if (!isMatch) {
        return res.status(400).json("Invalid credentials");
    }
}