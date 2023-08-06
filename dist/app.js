"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler_1 = __importDefault(
  require("./app/middlewares/globalErrorHandler")
);
const routes_1 = __importDefault(require("./app/routes"));
// import academicSemesterRouter from "./modules/academicSemester/academicSemester.router";
// import userRouter from "./modules/users/users.router";
const app = (0, express_1.default)();
// middleware
app.use((0, cors_1.default)());
// parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// application routes
// app.use("/api/v1/users", userRouter);
// app.use("/api/v1/academic-semester", academicSemesterRouter);
app.use("/api/v1/", routes_1.default);
// check env
// console.log(app.get("env"));
// primary route
/* app.get("/", (req: Request, res: Response) => {
  res.json("Hello university management");
  // throw new ApiError(400, "Ore baba..Error!");
  // default vaabe etake error hishebe paay express.
  // next("Ore baba..Error!");
}); */
app.use(globalErrorHandler_1.default);
// hanlde not found route
app.use((req, res, next) => {
  res.status(http_status_1.default.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});
exports.default = app;
