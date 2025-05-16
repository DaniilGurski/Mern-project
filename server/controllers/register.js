import UserModel from "../models/User.js";
import bcrypt from "bcrypt";

export const postRegister = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const userDoc = await UserModel.create({ username, password: hashedPassword }); 
        res.status(201).json(userDoc);
    } catch {
        res.status(400).send("Could not create user")
    }
}