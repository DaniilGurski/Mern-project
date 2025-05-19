import { Router } from "express";
import { getPost } from "../controllers/post.js";

const router = Router();

router.get("/:id", getPost);

export default router;
