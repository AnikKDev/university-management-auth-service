import { z } from "zod";

export const createManagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }),
  }),
});
