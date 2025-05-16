import { Router } from "express";
import { postRegister } from "../controllers/register.js";

const router = Router();

router.post("/", postRegister)

export default router;
