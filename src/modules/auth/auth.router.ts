import { Router } from "express";
import { validateRequest } from "../../app/middlewares/validateRequest";
import { loginUserController } from "./auth.controller";
import { loginZodSchema } from "./auth.validation";

const router = Router();
router.post("/login", validateRequest(loginZodSchema), loginUserController);

export default router;
