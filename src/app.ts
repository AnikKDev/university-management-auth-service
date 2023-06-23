import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import academicSemesterRouter from "./modules/academicSemester/academicSemester.router";
import userRouter from "./modules/users/users.router";
const app: Application = express();

// middleware
app.use(cors());
// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// application routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/academic-semester", academicSemesterRouter);

// check env
// console.log(app.get("env"));

// primary route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello university management");
  // throw new ApiError(400, "Ore baba..Error!");
  // default vaabe etake error hishebe paay express.
  // next("Ore baba..Error!");
});
app.use(globalErrorHandler);

export default app;
