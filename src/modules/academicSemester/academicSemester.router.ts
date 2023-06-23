import { Router } from "express";
import { validateRequest } from "../../app/middlewares/validateRequest";
import { createAcademicSemesterZodSchema } from "./academicSemester.validation";

const router = Router();

// academic semester routes
router.post(
  "/academic-semester",
  validateRequest(createAcademicSemesterZodSchema)
);

export default router;
