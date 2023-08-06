import { Router } from "express";
import { validateRequest } from "../../app/middlewares/validateRequest";
import {
  deleteSingleAdminController,
  getAllAdminsController,
  getSingleAdminController,
  updateSingleAdminController,
} from "./admin.controller";
import { updateAdminZodSchema } from "./admin.validation";

const router = Router();
/* router.post(
  "/create-admin",
  validateRequest(createAdminZodSchema),
  createAdminController
); */
router.get("/", getAllAdminsController);
router.patch(
  "/update-admin",
  validateRequest(updateAdminZodSchema),
  updateSingleAdminController
);
router.get("/:adminId", getSingleAdminController);
router.delete("/:id", deleteSingleAdminController);
export default router;
