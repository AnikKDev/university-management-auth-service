import { Router } from "express";
import { validateRequest } from "../../app/middlewares/validateRequest";
import {
  createAcademicDepartmentController,
  deleteSingleDepartmentController,
  getAllDepartmentsController,
  getSingleDepartmentController,
  updateSingleDepartmentController,
} from "./academicDepartment.controller";
import {
  createAcademicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
} from "./academicDepartment.validation";

const router = Router();

// academic Department routes
router.post(
  "/create-Department",
  validateRequest(createAcademicDepartmentZodSchema),
  createAcademicDepartmentController
);
router.get("/:id", getSingleDepartmentController);
router.patch(
  "/update-Department",
  validateRequest(updateAcademicDepartmentZodSchema),
  updateSingleDepartmentController
);
router.delete("/delete-Department", deleteSingleDepartmentController);
router.get("/", getAllDepartmentsController);
export default router;
