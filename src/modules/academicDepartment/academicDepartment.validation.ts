import { z } from "zod";

// request validation
// body --> object
//  data --> object

// create zod validation schema
export const createAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    academicFacultyId: z.string({
      required_error: "academic faculty _id is required",
    }),
  }),
});

///  Ensure 1: Route Level : Update -->  Give me title and code both , neither

export const updateAcademicDepartmentZodSchema = z
  .object({
    body: z.object({
      title: z.string({
        required_error: "Title is required",
      }),
      academicFacultyId: z.string({
        required_error: "academic faculty _id is required",
      }),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.academicFacultyId) ||
      (!data.body.title && !data.body.academicFacultyId),
    {
      message: "Either both title and id should be provided or neither",
    }
  );

// we are fine-tuning the data (body)
