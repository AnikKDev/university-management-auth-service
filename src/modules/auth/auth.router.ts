import { Router } from "express";
import { validateRequest } from "../../app/middlewares/validateRequest";
import { loginUserController, refreshTokenController } from "./auth.controller";
import { loginZodSchema, refreshTokenZodSchema } from "./auth.validation";

const router = Router();
router.post("/login", validateRequest(loginZodSchema), loginUserController);
router.post(
  "/refresh-token",
  validateRequest(refreshTokenZodSchema),
  refreshTokenController
);

export default router;
