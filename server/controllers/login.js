import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils.js";

const maxAge = 3 * 24 * 60 * 60; 

export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    let errors = { username: "", password: "", root: "" };
    let isMatch = false;

    const userDoc = await UserModel.findOne({ username }); 

    // User found
    if (userDoc) {
        isMatch = await bcrypt.compare(password, userDoc.password);
    }

    if (!userDoc || !isMatch) {
        errors.root = "Invalid credentials";
        return res.status(400).json(errors);
    }

    const token = createToken(userDoc._id, maxAge);

    // httpOnly: We can't access and change this cookie on frontend
    // Cookie method expects maxAge to be in milliseconds
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000})
    return res.status(200).json({ user: userDoc._id });
}