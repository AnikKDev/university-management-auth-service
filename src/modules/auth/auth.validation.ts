import { z } from "zod";
export const loginZodSchema = z.object({
  body: z.object({
    id: z.string({ required_error: "id is required" }),
    password: z.string({ required_error: "password is required" }),
  }),
});
