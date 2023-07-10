import { Router } from "express";
import { validateRequest } from "../../app/middlewares/validateRequest";
import { createStudentController } from "./users.controller";
import { createUserZodSchema } from "./users.validation";
const router = Router();
// routes
router.post(
  "/create-student",
  validateRequest(createUserZodSchema),
  createStudentController
);

export default router;
