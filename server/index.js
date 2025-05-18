import express from "express";
import cors from "cors";
import login from "./routes/login.js";
import register from "./routes/register.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = express();

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());


// Allow requests from frontend server
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }))

// Connect to the database
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(8000, () => console.log("Server running on port 8000"));
    })
    .catch((error) => {
        console.log(error);
    })

app.use("/login", login);
app.use("/register", register);