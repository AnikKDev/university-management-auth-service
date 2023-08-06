"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = require("../../app/middlewares/validateRequest");
const users_controller_1 = require("./users.controller");
const users_validation_1 = require("./users.validation");
const router = (0, express_1.Router)();
// routes
router.post(
  "/create-student",
  (0, validateRequest_1.validateRequest)(
    users_validation_1.createUserZodSchema
  ),
  users_controller_1.createStudentController
);
router.post(
  "/create-faculty",
  (0, validateRequest_1.validateRequest)(
    users_validation_1.createFacultyZodSchema
  ),
  users_controller_1.createFacultyController
);
exports.default = router;
