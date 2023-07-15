import { Model, Types } from "mongoose";
import { IAcademicDepartment } from "../academicDepartment/academicDepartment.interface";

export type IAcademicFaculty = {
  title: string;
};
// type for creating the faculty through the user route (user --> academicFaculty)
export type IUserAcademicFaculty = {
  id: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  dateOfBirth: string;
  gender: "male" | "female";
  bloodGroup: "A+" | "B+" | "AB+" | "O+" | "A-" | "B-" | "AB-";
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  designation: string;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  profileImg?: string;
  password?: string;
};

export type IAcademicFacultyTitle =
  | "Faculty of Science and Engineering"
  | "Faculty of Business and Administration"
  | "Faculty of Arts and Social Science";
export type IAcademicFacultyModel = Model<IAcademicFaculty>;
export type IUserAcademicFacultyModel = Model<IUserAcademicFaculty>;
