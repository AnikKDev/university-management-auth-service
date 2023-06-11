import express, {
  Application,
  Request,
  Response,
  request,
  response,
  urlencoded,
} from "express";
import cors from "cors";
const app: Application = express();

// middleware
app.use(cors());
// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// primary route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello university management");
});
export default app;
