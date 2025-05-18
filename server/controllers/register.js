import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils.js";

const maxAge = 3 * 24 * 60 * 60; 

const handleErrors = (error) => {
    const message = error.message.toLowerCase();
    let errors = { username: "", password: "", root: ""};

    if (error?.cause.code) {
        errors.username = "Username already exists";
        return errors;
    }

    if (message.includes("user validation failed")) {
        Object.values(error.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

export const postRegister = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const userDoc = await UserModel.create({ username, password: hashedPassword}); 
        const token = createToken(userDoc._id, maxAge);
        
        // httpOnly: We can't access and change this cookie on frontend
        // Cookie method expects maxAge to be in milliseconds
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({ user: userDoc._id });
    } catch (error) {
        console.log(error);
        const body = handleErrors(error);
        res.status(400).json(body);
    }
}