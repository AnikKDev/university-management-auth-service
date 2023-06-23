import { z } from "zod";
import { academicSemesterConstantMonth } from "./academicSemester.constant";
// request validation
// body --> object
//  data --> object

// create zod validation schema
export const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(["autumn", "summar", "fall"], {
      required_error: "Title is required",
    }),
    year: z.number({
      required_error: "Year is required",
    }),
    code: z.enum(["01", "02", "03"], {
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
