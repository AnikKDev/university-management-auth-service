import { z } from "zod";
// request validation
// body --> object
//  data --> object

// scafolding
// create zod schema
export const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: "Role is required",
    }),
    password: z.string().optional(),
  }),
});
//   await createUserZodSchema.parseAsync(req);
