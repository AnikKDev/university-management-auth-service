import { Router } from "express";
import { validateRequest } from "../../app/middlewares/validateRequest";
import { createManagementDepartmentController } from "./managementDepartment.controller";
import { createManagementDepartmentZodSchema } from "./managementDepartment.validation";

const router = Router();
router.post(
  "/create-management",
  validateRequest(createManagementDepartmentZodSchema),
  createManagementDepartmentController
);
export default router;
