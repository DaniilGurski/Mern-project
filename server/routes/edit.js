import { Router } from "express";
import { putEdit } from "../controllers/edit.js";
import multer from "multer";
import path from "path";
import { __dirname } from "../index.js";

const router = Router(); 
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, path.join(__dirname, "public", "uploads")),
    filename: (_req, file, cb) => {
        cb(null, file.originalname)
    },
})
const upload = multer({ storage });

// Reads and uploads single file specified in the "image" field from frontend
router.put("/:id", upload.single("image"), putEdit); 

export default router;