import { Router } from "express";
import { validateRequest } from "../../app/middlewares/validateRequest";
import {
  createAdminController,
  getAllAdminsController,
} from "./admin.controller";
import { createAdminZodSchema } from "./admin.validation";

const router = Router();
router.post(
  "/create-admin",
  validateRequest(createAdminZodSchema),
  createAdminController
);
router.get("/", getAllAdminsController);
export default router;
