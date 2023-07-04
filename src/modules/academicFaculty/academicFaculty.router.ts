import { Router } from "express";
import { validateRequest } from "../../app/middlewares/validateRequest";
import {
  createAcademicFacultyController,
  deleteAcademicFacultyController,
  getAcademicFacultyController,
  updateAcademicFacultyController,
} from "./academicFaculty.controller";
import {
  createAcademicFacultyZodSchema,
  updateAcademicFacultyZodSchema,
} from "./academicFaculty.validation";

const router = Router();
//
router.post(
  "/create-faculty",
  validateRequest(createAcademicFacultyZodSchema),
  createAcademicFacultyController
);
router.delete("/delete-faculty", deleteAcademicFacultyController);
router.patch(
  "/update-faculty",
  validateRequest(updateAcademicFacultyZodSchema),
  updateAcademicFacultyController
);
router.get("/", getAcademicFacultyController);

export default router;
