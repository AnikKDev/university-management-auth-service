import { Model } from "mongoose";

export type IAcademicFaculty = {
  title: string;
};
export type IAcademicFacultyTitle =
  | "Faculty of Science and Engineering"
  | "Faculty of Business and Administration"
  | "Faculty of Arts and Social Science";
export type IAcademicFacultyModel = Model<IAcademicFaculty>;
