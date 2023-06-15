import cors from "cors";
import express, { Application, Request, Response } from "express";
import userRouter from "./modules/users/users.router";
const app: Application = express();

// middleware
app.use(cors());
// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// application routes
app.use("/api/v1/users", userRouter);

// check env
// console.log(app.get("env"));
// primary route
app.get("/", async (req: Request, res: Response) => {
  res.send("Hello university management");
});
export default app;
