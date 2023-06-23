import { Model } from "mongoose";
export type IAcademicSemesterMonth =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";
export type IAcademicSemesterTitle = "autumn" | "summar" | "fall";
export type IAcademicSemesterCode = "01" | "02" | "03";
export type IAcademicSemester = {
  title: IAcademicSemesterTitle;
  year: string | number;
  code: IAcademicSemesterCode;
  startMonth: IAcademicSemesterMonth;
  endMonth: IAcademicSemesterMonth;
};

export type AcademicSemesterModel = Model<IAcademicSemester>;
