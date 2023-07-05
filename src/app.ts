import cors from "cors";
import express, { Application, Request, Response } from "express";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";
// import academicSemesterRouter from "./modules/academicSemester/academicSemester.router";
// import userRouter from "./modules/users/users.router";
const app: Application = express();

// middleware
app.use(cors());
// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// application routes
// app.use("/api/v1/users", userRouter);
// app.use("/api/v1/academic-semester", academicSemesterRouter);
app.use("/api/v1/", router);
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

// hanlde not found route
app.use((req: Request, res: Response) => {
  console.log("from the not found meow");
  res.status(httpStatus.NOT_FOUND).send({
    success: false,
    message: "Page not found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API not found",
      },
    ],
  });
  // next();
});

export default app;
