import { Schema, model } from "mongoose";
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
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
    },
    endMonth: {
      type: String,
      required: true,
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
