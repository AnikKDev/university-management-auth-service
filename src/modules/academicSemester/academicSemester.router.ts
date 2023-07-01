import { Router } from "express";
import { validateRequest } from "../../app/middlewares/validateRequest";
import {
  createAcademicSemesterController,
  getAllSemestersController,
  getSingleSemesterController,
} from "./academicSemester.controller";
import { createAcademicSemesterZodSchema } from "./academicSemester.validation";

const router = Router();

// academic semester routes
router.post(
  "/create-semester",
  validateRequest(createAcademicSemesterZodSchema),
  createAcademicSemesterController
);
router.get("/:id", getSingleSemesterController);
router.get("/", getAllSemestersController);
export default router;
