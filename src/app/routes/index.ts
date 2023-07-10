import { Router } from "express";
import academicDepartmentRouter from "../../modules/academicDepartment/academicDepartment.router";
import academicFacultyRouter from "../../modules/academicFaculty/academicFaculty.router";
import academicSemesterRouter from "../../modules/academicSemester/academicSemester.router";
import studentRouter from "../../modules/student/student.router";
import userRouter from "../../modules/users/users.router";
const router = Router();
//
const moduleRoutes = [
  { path: "/users", router: userRouter },
  { path: "/academic-semester", router: academicSemesterRouter },
  { path: "/academic-faculty", router: academicFacultyRouter },
  { path: "/academic-department", router: academicDepartmentRouter },
  { path: "/students", router: studentRouter },
];
/* router.use("/users", userRouter);
router.use("/academic-semester", academicSemesterRouter); */
moduleRoutes.forEach(route => router.use(route.path, route.router));
export default router;
