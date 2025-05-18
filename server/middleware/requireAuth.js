import jwt from "jsonwebtoken";

const requireAuth = (req, res, next) => {
    const token = req.token.jwt;

    if (!token) {
        return res.redirect("/login"); 
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
        if (error) {
            console.log(error.message);
            return res.redirect("/login");
        }

        console.log(decodedToken);
        next();
    })
}

export default requireAuth; 