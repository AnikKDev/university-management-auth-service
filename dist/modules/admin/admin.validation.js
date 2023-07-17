"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdminZodSchema = exports.createAdminZodSchema = void 0;
const zod_1 = require("zod");
const student_constants_1 = require("../student/student.constants");
exports.createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        admin: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: "First name is required",
                }),
                lastName: zod_1.z.string({
                    required_error: "Last name is required",
                }),
                middleName: zod_1.z.string().optional(),
            }),
            gender: zod_1.z.enum([...student_constants_1.gender], {
                required_error: "Gender is required",
            }),
            dateOfBirth: zod_1.z.string({
                required_error: "Date of birth is required",
            }),
            email: zod_1.z
                .string({
                required_error: "Email is required",
            })
                .email(),
            contactNo: zod_1.z.string({
                required_error: "Contact number is required",
            }),
            emergencyContactNo: zod_1.z.string({
                required_error: "Emergency contact number is required",
            }),
            bloodGroup: zod_1.z.enum([...student_constants_1.bloodGroup]).optional(),
            presentAddress: zod_1.z.string({
                required_error: "Present address is required",
            }),
            permanentAddress: zod_1.z.string({
                required_error: "Permanent address is required",
            }),
            managementDepartment: zod_1.z.string({
                required_error: "Management department is required",
            }),
            profileImage: zod_1.z.string().optional(),
        }),
        password: zod_1.z.string().optional(),
    }),
});
exports.updateAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({ required_error: "updated id is required" }),
        data: zod_1.z.object({
            name: zod_1.z
                .object({
                firstName: zod_1.z
                    .string({
                    required_error: "First name is required",
                })
                    .optional(),
                lastName: zod_1.z
                    .string({
                    required_error: "Last name is required",
                })
                    .optional(),
                middleName: zod_1.z.string().optional(),
            })
                .optional(),
            gender: zod_1.z
                .enum([...student_constants_1.gender], {
                required_error: "Gender is required",
            })
                .optional(),
            dateOfBirth: zod_1.z
                .string({
                required_error: "Date of birth is required",
            })
                .optional(),
            email: zod_1.z
                .string({
                required_error: "Email is required",
            })
                .email()
                .optional(),
            contactNo: zod_1.z
                .string({
                required_error: "Contact number is required",
            })
                .optional(),
            emergencyContactNo: zod_1.z
                .string({
                required_error: "Emergency contact number is required",
            })
                .optional(),
            bloodGroup: zod_1.z.enum([...student_constants_1.bloodGroup]).optional(),
            presentAddress: zod_1.z
                .string({
                required_error: "Present address is required",
            })
                .optional(),
            permanentAddress: zod_1.z
                .string({
                required_error: "Permanent address is required",
            })
                .optional(),
            managementDepartment: zod_1.z
                .string({
                required_error: "Management department is required",
            })
                .optional(),
            profileImage: zod_1.z.string().optional(),
        }),
        password: zod_1.z.string().optional(),
    }),
});
