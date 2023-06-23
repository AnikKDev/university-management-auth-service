import { Model } from "mongoose";

export type IAcademicSemester = {
  title: string;
  year: string | number;
  code: number | string;
  startMonth: string;
  endMonth: string;
};

export type AcademicSemesterModel = Model<IAcademicSemester>;
