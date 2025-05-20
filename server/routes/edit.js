import { Router } from "express";
import { putEdit } from "../controllers/edit.js";

const router = Router(); 

router.put("/:id", putEdit); 

export default router;