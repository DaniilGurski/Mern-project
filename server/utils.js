import jwt from "jsonwebtoken";

export const createToken = (id, maxAge) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
}