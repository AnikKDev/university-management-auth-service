import { z } from "zod";
import {
  academicSemesterConstantCode,
  academicSemesterConstantMonth,
  academicSemesterConstantTitle,
} from "./academicSemester.constant";
// request validation
// body --> object
//  data --> object

// create zod validation schema
export const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterConstantTitle] as [string, ...string[]], {
      required_error: "Title is required",
    }),
    year: z.string({
      required_error: "Year is required",
    }),
    code: z.enum([...academicSemesterConstantCode] as [string, ...string[]], {
      required_error: "Semester code is required",
    }),
    startMonth: z.enum(
      [...academicSemesterConstantMonth] as [string, ...string[]],
      {
        required_error: "Start month is required",
      }
    ),
    endMonth: z.enum(
      [...academicSemesterConstantMonth] as [string, ...string[]],
      {
        required_error: "End month is required",
      }
    ),
  }),
});
