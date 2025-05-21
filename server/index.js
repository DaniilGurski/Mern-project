import express from "express";
import cors from "cors";
import login from "./routes/login.js";
import register from "./routes/register.js";
import auth from "./routes/auth.js";
import logout from "./routes/logout.js";
import posts from "./routes/posts.js";
import edit from "./routes/edit.js";
import requireAuth from "./middleware/requireAuth.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from "path";

const app = express();

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

// Setup static folder
app.use(express.static(path.join(__dirname, "public")))


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
app.use("/auth", requireAuth, auth);
app.use("/logout", requireAuth, logout);
app.use("/posts", posts)
app.use("/edit", edit)