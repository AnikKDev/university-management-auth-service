import { Router } from "express";
import authHanlder from "../../app/middlewares/authHandler";
import { validateRequest } from "../../app/middlewares/validateRequest";
import { ENUM_USER_ROLE } from "../../enums/users";
import {
  createAcademicFacultyController,
  deleteAcademicFacultyController,
  getAcademicFacultyController,
  getAllAcademicFacultyController,
  updateAcademicFacultyController,
} from "./academicFaculty.controller";
import {
  createAcademicFacultyZodSchema,
  updateAcademicFacultyZodSchema,
} from "./academicFaculty.validation";
//
const router = Router();
//
router.post(
  "/create-faculty",
  validateRequest(createAcademicFacultyZodSchema),
  authHanlder(ENUM_USER_ROLE.ADMIN),
  createAcademicFacultyController
);
router.get(
  "/all-faculties",
  authHanlder(ENUM_USER_ROLE.STUDENT),
  getAllAcademicFacultyController
);
router.delete(
  "/delete-faculty",
  authHanlder(ENUM_USER_ROLE.ADMIN),
  deleteAcademicFacultyController
);
router.patch(
  "/update-faculty",
  validateRequest(updateAcademicFacultyZodSchema),
  authHanlder(ENUM_USER_ROLE.ADMIN),
  updateAcademicFacultyController
);
router.get(
  "/",
  authHanlder(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  getAcademicFacultyController
);

export default router;
