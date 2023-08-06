"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAcademicFacultyZodSchema =
  exports.createAcademicFacultyZodSchema = void 0;
const zod_1 = require("zod");
const academicFaculty_constant_1 = require("./academicFaculty.constant");
exports.createAcademicFacultyZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.enum([...academicFaculty_constant_1.academicFacultyTitles], {
      required_error: " Title is required for creating Academic Faculty",
    }),
  }),
});
exports.updateAcademicFacultyZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    id: zod_1.z.string().nonempty({ message: "ID is required for updating" }),
    data: zod_1.z.object({
      title: zod_1.z.enum(
        [...academicFaculty_constant_1.academicFacultyTitles],
        {
          required_error: "Title is required for creating Academic Faculty",
        }
      ),
    }),
  }),
});
