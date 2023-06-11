import express, { Application, Request, Response } from "express";
import cors from "cors";
const app: Application = express();

// middleware
app.use(cors());
// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// primary route
app.get("/", (req: Request, res: Response): any => {
  res.send("Hello university management");
});
export default app;
