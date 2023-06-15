import { Router } from "express";
import { createUserController } from "./users.controller";
const router = Router();
// routes
router.post("/create-user", createUserController);

export default router;
