import { Router } from "express";
import { validateRequest } from "../../app/middlewares/validateRequest";
import { createAdminController } from "../admin/admin.controller";
import { createAdminZodSchema } from "../admin/admin.validation";
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
router.post(
  "/create-admin",
  validateRequest(createAdminZodSchema),
  createAdminController
);
export default router;
