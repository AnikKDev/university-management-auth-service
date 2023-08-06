"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = require("../../app/middlewares/validateRequest");
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const router = (0, express_1.Router)();
// academic Department routes
router.post(
  "/create-Department",
  (0, validateRequest_1.validateRequest)(
    academicDepartment_validation_1.createAcademicDepartmentZodSchema
  ),
  academicDepartment_controller_1.createAcademicDepartmentController
);
router.get(
  "/:id",
  academicDepartment_controller_1.getSingleDepartmentController
);
router.patch(
  "/update-Department",
  (0, validateRequest_1.validateRequest)(
    academicDepartment_validation_1.updateAcademicDepartmentZodSchema
  ),
  academicDepartment_controller_1.updateSingleDepartmentController
);
router.delete(
  "/delete-Department",
  academicDepartment_controller_1.deleteSingleDepartmentController
);
router.get("/", academicDepartment_controller_1.getAllDepartmentsController);
exports.default = router;
