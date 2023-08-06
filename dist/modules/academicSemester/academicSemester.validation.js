"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAcademicSemesterZodSchema =
  exports.createAcademicSemesterZodSchema = void 0;
const zod_1 = require("zod");
const academicSemester_constant_1 = require("./academicSemester.constant");
// request validation
// body --> object
//  data --> object
// create zod validation schema
exports.createAcademicSemesterZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.enum(
      [...academicSemester_constant_1.academicSemesterConstantTitle],
      {
        required_error: "Title is required",
      }
    ),
    year: zod_1.z.string({
      required_error: "Year is required",
    }),
    code: zod_1.z.enum(
      [...academicSemester_constant_1.academicSemesterConstantCode],
      {
        required_error: "Semester code is required",
      }
    ),
    startMonth: zod_1.z.enum(
      [...academicSemester_constant_1.academicSemesterConstantMonth],
      {
        required_error: "Start month is required",
      }
    ),
    endMonth: zod_1.z.enum(
      [...academicSemester_constant_1.academicSemesterConstantMonth],
      {
        required_error: "End month is required",
      }
    ),
  }),
});
///  Ensure 1: Route Level : Update -->  Give me title and code both , neither
exports.updateAcademicSemesterZodSchema = zod_1.z
  .object({
    body: zod_1.z.object({
      id: zod_1.z.string().nonempty({ message: "ID is required" }),
      updatedData: zod_1.z.object({
        title: zod_1.z
          .enum(
            [...academicSemester_constant_1.academicSemesterConstantTitle],
            {
              required_error: "Title is required",
            }
          )
          .optional(),
        year: zod_1.z
          .string({
            required_error: "Year is required",
          })
          .optional(),
        code: zod_1.z
          .enum([...academicSemester_constant_1.academicSemesterConstantCode])
          .optional(),
        startMonth: zod_1.z
          .enum(
            [...academicSemester_constant_1.academicSemesterConstantMonth],
            {
              required_error: "Start month is needed",
            }
          )
          .optional(),
        endMonth: zod_1.z
          .enum(
            [...academicSemester_constant_1.academicSemesterConstantMonth],
            {
              required_error: "End month is needed",
            }
          )
          .optional(),
      }),
    }),
  })
  .refine(
    data =>
      (data.body.updatedData.title && data.body.updatedData.code) ||
      (!data.body.updatedData.title && !data.body.updatedData.code),
    {
      message: "Either both title and code should be provided or neither",
    }
  );
// we are fine-tuning the data (body)
