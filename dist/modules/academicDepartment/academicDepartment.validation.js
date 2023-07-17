"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAcademicDepartmentZodSchema = exports.createAcademicDepartmentZodSchema = void 0;
const zod_1 = require("zod");
// request validation
// body --> object
//  data --> object
// create zod validation schema
exports.createAcademicDepartmentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required",
        }),
        academicFacultyId: zod_1.z.string({
            required_error: "academic faculty _id is required",
        }),
    }),
});
///  Ensure 1: Route Level : Update -->  Give me title and code both , neither
exports.updateAcademicDepartmentZodSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required",
        }),
        academicFacultyId: zod_1.z.string({
            required_error: "academic faculty _id is required",
        }),
    }),
})
    .refine(data => (data.body.title && data.body.academicFacultyId) ||
    (!data.body.title && !data.body.academicFacultyId), {
    message: "Either both title and id should be provided or neither",
});
// we are fine-tuning the data (body)
