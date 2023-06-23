import { Schema, model } from "mongoose";
import {
  academicSemesterConstantCode,
  academicSemesterConstantMonth,
  academicSemesterConstantTitle,
} from "./academicSemester.constant";
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from "./academicSemester.interface";

// for future usage
const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    // custom made id (not from mongoose)
    title: {
      type: String,
      required: true,
      enum: academicSemesterConstantTitle,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterConstantCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterConstantMonth,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterConstantMonth,
    },
  },
  {
    timestamps: true,
  }
);
// create model
const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  "AcademicSemester",
  academicSemesterSchema
);

export default AcademicSemester;
