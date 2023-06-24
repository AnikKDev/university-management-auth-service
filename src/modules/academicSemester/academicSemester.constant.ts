import {
  IAcademicSemesterCode,
  IAcademicSemesterMonth,
  IAcademicSemesterTitle,
} from "./academicSemester.interface";

export const academicSemesterConstantMonth: IAcademicSemesterMonth[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const academicSemesterConstantTitle: IAcademicSemesterTitle[] = [
  "autumn",
  "summar",
  "fall",
];
export const academicSemesterConstantCode: IAcademicSemesterCode[] = [
  "01",
  "02",
  "03",
];
export const academicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  autumn: "01",
  summar: "02",
  fall: "03",
};
