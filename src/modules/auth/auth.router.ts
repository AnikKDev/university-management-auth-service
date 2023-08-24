import { Router } from "express";
import authHanlder from "../../app/middlewares/authHandler";
import { validateRequest } from "../../app/middlewares/validateRequest";
import { ENUM_USER_ROLE } from "../../enums/users";
import {
  changePasswordController,
  loginUserController,
  refreshTokenController,
} from "./auth.controller";
import {
  changePasswordZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
} from "./auth.validation";

const router = Router();
router.post("/login", validateRequest(loginZodSchema), loginUserController);
router.post(
  "/refresh-token",
  validateRequest(refreshTokenZodSchema),
  refreshTokenController
);
router.post(
  "/change-password",
  validateRequest(changePasswordZodSchema),
  authHanlder(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  changePasswordController
);

export default router;
