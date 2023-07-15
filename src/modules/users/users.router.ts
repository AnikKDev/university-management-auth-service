import { Router } from "express";
import { validateRequest } from "../../app/middlewares/validateRequest";
import {
  createFacultyController,
  createStudentController,
} from "./users.controller";
import {
  createFacultyZodSchema,
  createUserZodSchema,
} from "./users.validation";
const router = Router();
// routes
router.post(
  "/create-student",
  validateRequest(createUserZodSchema),
  createStudentController
);
router.post(
  "/create-faculty",
  validateRequest(createFacultyZodSchema),
  createFacultyController
);
export default router;
