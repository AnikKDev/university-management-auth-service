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

///  Ensure 1: Route Level : Update -->  Give me title and code both , neither

export const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      id: z.string().nonempty({ message: "ID is required" }),
      updatedData: z.object({
        title: z
          .enum([...academicSemesterConstantTitle] as [string, ...string[]], {
            required_error: "Title is required",
          })
          .optional(),
        year: z
          .string({
            required_error: "Year is required",
          })
          .optional(),
        code: z
          .enum([...academicSemesterConstantCode] as [string, ...string[]])
          .optional(),
        startMonth: z
          .enum([...academicSemesterConstantMonth] as [string, ...string[]], {
            required_error: "Start month is needed",
          })
          .optional(),
        endMonth: z
          .enum([...academicSemesterConstantMonth] as [string, ...string[]], {
            required_error: "End month is needed",
          })
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
