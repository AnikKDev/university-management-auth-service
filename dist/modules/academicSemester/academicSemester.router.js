"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = require("../../app/middlewares/validateRequest");
const academicSemester_controller_1 = require("./academicSemester.controller");
const academicSemester_validation_1 = require("./academicSemester.validation");
const router = (0, express_1.Router)();
// academic semester routes
router.post("/create-semester", (0, validateRequest_1.validateRequest)(academicSemester_validation_1.createAcademicSemesterZodSchema), academicSemester_controller_1.createAcademicSemesterController);
router.get("/:id", academicSemester_controller_1.getSingleSemesterController);
router.patch("/update-semester", (0, validateRequest_1.validateRequest)(academicSemester_validation_1.updateAcademicSemesterZodSchema), academicSemester_controller_1.updateSingleSemesterController);
router.delete("/delete-semester", academicSemester_controller_1.deleteSingleSemesterController);
router.get("/", academicSemester_controller_1.getAllSemestersController);
exports.default = router;
