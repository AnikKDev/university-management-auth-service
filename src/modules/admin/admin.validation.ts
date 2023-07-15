import { z } from "zod";
import { bloodGroup, gender } from "../student/student.constants";

export const createAdminZodSchema = z.object({
  body: z.object({
    admin: z.object({
      name: z.object({
        firstName: z.string({
          required_error: "First name is required",
        }),
        lastName: z.string({
          required_error: "Last name is required",
        }),
        middleName: z.string().optional(),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: "Gender is required",
      }),
      dateOfBirth: z.string({
        required_error: "Date of birth is required",
      }),
      email: z
        .string({
          required_error: "Email is required",
        })
        .email(),
      contactNo: z.string({
        required_error: "Contact number is required",
      }),
      emergencyContactNo: z.string({
        required_error: "Emergency contact number is required",
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string({
        required_error: "Present address is required",
      }),
      permanentAddress: z.string({
        required_error: "Permanent address is required",
      }),
      managementDepartment: z.string({
        required_error: "Management department is required",
      }),
      profileImage: z.string().optional(),
    }),
    password: z.string().optional(),
  }),
});
