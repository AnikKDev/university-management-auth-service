import { Router } from "express";
import academicSemesterRouter from "../../modules/academicSemester/academicSemester.router";
import userRouter from "../../modules/users/users.router";
const router = Router();
//
const moduleRoutes = [
  { path: "/users", router: userRouter },
  { path: "/academic-semester", router: academicSemesterRouter },
];
/* router.use("/users", userRouter);
router.use("/academic-semester", academicSemesterRouter); */
moduleRoutes.forEach(route => router.use(route.path, route.router));
export default router;
