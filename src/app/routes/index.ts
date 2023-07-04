import { Router } from "express";
import academicFacultyRouter from "../../modules/academicFaculty/academicFaculty.router";
import academicSemesterRouter from "../../modules/academicSemester/academicSemester.router";
import userRouter from "../../modules/users/users.router";
const router = Router();
//
const moduleRoutes = [
  { path: "/users", router: userRouter },
  { path: "/academic-semester", router: academicSemesterRouter },
  { path: "/academic-faculty", router: academicFacultyRouter },
];
/* router.use("/users", userRouter);
router.use("/academic-semester", academicSemesterRouter); */
moduleRoutes.forEach(route => router.use(route.path, route.router));
export default router;
