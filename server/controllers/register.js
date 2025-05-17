import UserModel from "../models/User.js";
import bcrypt from "bcrypt";

const handleErrors = (error) => {
    const message = error.message.toLowerCase();
    let errors = { username: "", password: ""};

    if (error.cause.code) {
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
        res.status(201).json(userDoc);
    } catch (error) {
        const body = handleErrors(error);
        res.status(400).json(body);
    }
}