import { Router } from "express";
import { getAuthSignedIn } from "../controllers/auth.js";

const router = Router();

router.get("/signed-in", getAuthSignedIn);

export default router;
