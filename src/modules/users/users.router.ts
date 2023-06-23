import { Router } from "express";
import { validateRequest } from "../../app/middlewares/validateRequest";
import { createUserController } from "./users.controller";
import { createUserZodSchema } from "./users.validation";
const router = Router();
// routes
router.post(
  "/create-user",
  validateRequest(createUserZodSchema),
  createUserController
);

export default router;
