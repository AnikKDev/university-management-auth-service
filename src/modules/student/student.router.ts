import { IRouter, Router } from "express";
import { validateRequest } from "../../app/middlewares/validateRequest";
import {
  deleteSingleStudentController,
  getAllStudentController,
  getSingleStudentController,
  updateSingleStudentController,
} from "./student.controller";
import { updateStudentZodSchema } from "./student.validation";
const router: IRouter = Router();

router.get("/", getAllStudentController);
router.get("/:id", getSingleStudentController);
router.patch(
  "/:id",
  validateRequest(updateStudentZodSchema),
  updateSingleStudentController
);
router.delete("/:id", deleteSingleStudentController);

export default router;
