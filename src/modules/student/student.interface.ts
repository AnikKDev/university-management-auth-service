import { Model, Types } from "mongoose";
import { IAcademicDepartment } from "../academicDepartment/academicDepartment.interface";
import { IAcademicFaculty } from "../academicFaculty/academicFaculty.interface";
import { IAcademicSemester } from "../academicSemester/academicSemester.interface";

export type IStudent = {
  id: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  dateOfBirth: string;
  gender: "male" | "female";
  bloodGroup?: "A+" | "B+" | "AB+" | "O+" | "A-" | "B-" | "AB-";
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: {
    fatherName: string;
    fatherContactNo: string;
    fatherOccupation: string;
    motherName: string;
    motherContactNo: string;
    motherOccupation: string;
  };
  localGuardian: {
    name: string;
    contactNo: string;
    occupation: string;
    address: string;
  };
  profileImg?: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  academicSemester: Types.ObjectId | IAcademicSemester;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  password?: string;
};
export type IStudentModel = Model<IStudent, Record<string, unknown>>;
