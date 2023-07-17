"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = require("../../app/middlewares/validateRequest");
const managementDepartment_controller_1 = require("./managementDepartment.controller");
const managementDepartment_validation_1 = require("./managementDepartment.validation");
const router = (0, express_1.Router)();
router.post("/create-management", (0, validateRequest_1.validateRequest)(managementDepartment_validation_1.createManagementDepartmentZodSchema), managementDepartment_controller_1.createManagementDepartmentController);
exports.default = router;
