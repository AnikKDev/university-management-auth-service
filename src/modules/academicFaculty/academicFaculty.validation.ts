import { z } from "zod";
import { academicFacultyTitles } from "./academicFaculty.constant";

export const createAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicFacultyTitles] as [string, ...string[]], {
      required_error: " Title is required for creating Academic Faculty",
    }),
  }),
});
export const updateAcademicFacultyZodSchema = z.object({
  body: z.object({
    id: z.string().nonempty({ message: "ID is required for updating" }),
    data: z.object({
      title: z.enum([...academicFacultyTitles] as [string, ...string[]], {
        required_error: "Title is required for creating Academic Faculty",
      }),
    }),
  }),
});
