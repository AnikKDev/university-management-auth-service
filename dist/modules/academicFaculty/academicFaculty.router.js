"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = require("../../app/middlewares/validateRequest");
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const academicFaculty_validation_1 = require("./academicFaculty.validation");
//
const router = (0, express_1.Router)();
//
router.post("/create-faculty", (0, validateRequest_1.validateRequest)(academicFaculty_validation_1.createAcademicFacultyZodSchema), academicFaculty_controller_1.createAcademicFacultyController);
router.get("/all-faculties", academicFaculty_controller_1.getAllAcademicFacultyController);
router.delete("/delete-faculty", academicFaculty_controller_1.deleteAcademicFacultyController);
router.patch("/update-faculty", (0, validateRequest_1.validateRequest)(academicFaculty_validation_1.updateAcademicFacultyZodSchema), academicFaculty_controller_1.updateAcademicFacultyController);
router.get("/", academicFaculty_controller_1.getAcademicFacultyController);
exports.default = router;
