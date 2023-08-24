import { z } from "zod";
export const loginZodSchema = z.object({
  body: z.object({
    id: z.string({ required_error: "id is required" }),
    password: z.string({ required_error: "password is required" }),
  }),
});
export const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: "refresh token is required" }),
  }),
});
export const changePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: "Please provide the old password",
    }),
    newPassword: z.string({ required_error: "new password is required" }),
  }),
});
