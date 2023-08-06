"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = require("../../app/middlewares/validateRequest");
const student_controller_1 = require("./student.controller");
const student_validation_1 = require("./student.validation");
const router = (0, express_1.Router)();
router.get("/", student_controller_1.getAllStudentController);
router.get("/:id", student_controller_1.getSingleStudentController);
router.patch(
  "/:id",
  (0, validateRequest_1.validateRequest)(
    student_validation_1.updateStudentZodSchema
  ),
  student_controller_1.updateSingleStudentController
);
router.delete("/:id", student_controller_1.deleteSingleStudentController);
exports.default = router;
