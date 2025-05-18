import jwt from "jsonwebtoken";

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    
    if (!token) {
        return res.status(401).send();
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
        if (error) {
            return res.status(401).send();
        }
        next();
    })
}

export default requireAuth; 