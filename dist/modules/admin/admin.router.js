"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = require("../../app/middlewares/validateRequest");
const admin_controller_1 = require("./admin.controller");
const admin_validation_1 = require("./admin.validation");
const router = (0, express_1.Router)();
router.post(
  "/create-admin",
  (0, validateRequest_1.validateRequest)(
    admin_validation_1.createAdminZodSchema
  ),
  admin_controller_1.createAdminController
);
router.get("/", admin_controller_1.getAllAdminsController);
router.patch(
  "/update-admin",
  (0, validateRequest_1.validateRequest)(
    admin_validation_1.updateAdminZodSchema
  ),
  admin_controller_1.updateSingleAdminController
);
router.get("/:adminId", admin_controller_1.getSingleAdminController);
router.delete("/:id", admin_controller_1.deleteSingleAdminController);
exports.default = router;