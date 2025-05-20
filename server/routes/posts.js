import { Router } from "express";
import { getPost, getPosts } from "../controllers/posts.js";

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPost);


export default router;
