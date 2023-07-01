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
  year: string;
  code: IAcademicSemesterCode;
  startMonth: IAcademicSemesterMonth;
  endMonth: IAcademicSemesterMonth;
};

export type AcademicSemesterModel = Model<IAcademicSemester>;
// generic type for getting all the data
export type IGenericResponse<T> = {
  meta: {
    page?: number;
    limit?: number;
    totalData?: number;
  };
  data: T;
};
// type for search term
export type IAcademicSemesterFilter = {
  searchTerm?: string;
};
