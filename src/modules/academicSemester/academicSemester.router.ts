import { Router } from "express";
import { validateRequest } from "../../app/middlewares/validateRequest";
import {
  createAcademicSemesterController,
  getAllSemestersController,
  getSingleSemesterController,
  updateSingleSemesterController,
} from "./academicSemester.controller";
import {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
} from "./academicSemester.validation";

const router = Router();

// academic semester routes
router.post(
  "/create-semester",
  validateRequest(createAcademicSemesterZodSchema),
  createAcademicSemesterController
);
router.get("/:id", getSingleSemesterController);
router.patch(
  "/update-semester",
  validateRequest(updateAcademicSemesterZodSchema),
  updateSingleSemesterController
);
router.get("/", getAllSemestersController);
export default router;
