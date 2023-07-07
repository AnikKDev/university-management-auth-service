import { Model, Types } from "mongoose";
import { IAcademicFaculty } from "../academicFaculty/academicFaculty.interface";

export type IAcademicDepartment = {
  title: string;
  academicFacultyId: IAcademicFaculty | Types.ObjectId;
};
export type IAcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>;
// type for search term
export type IAcademicDepartmentFilter = {
  searchTerm?: string;
};
