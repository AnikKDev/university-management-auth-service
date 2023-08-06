import express from "express";
import { validateRequest } from "../../app/middlewares/validateRequest";
import {
  deleteFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
} from "./faculty.controller";
import { updateFacultyZodSchema } from "./faculty.validation";

const router = express.Router();

router.get("/:id", getSingleFaculty);
router.get("/", getAllFaculties);

router.patch("/:id", validateRequest(updateFacultyZodSchema), updateFaculty);

router.delete("/:id", deleteFaculty);

export default router;
