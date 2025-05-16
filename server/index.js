import express from "express";
import cors from "cors";
import login from "./routes/login.js";
import register from "./routes/register.js";
import mongoose from "mongoose";

const app = express();

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Allow requests from frontend server
app.use(cors({ origin: ["http://localhost:5173"] }))

// Connect to the database
mongoose.connect(process.env.MONGODB_URI)

app.use("/login", login);
app.use("/register", register);

app.listen(8000, () => console.log("Server running on port 8000"));