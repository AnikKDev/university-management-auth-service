import status from "http-status";
import { Schema, model } from "mongoose";
import ApiError from "../../errors/ApiError";
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

//? 2025 autumm
//! 2025 autumn X
//? 2026 autumn
//? same year && same semester --> duplicate entry (it won't happen)

// ! handling same year and same semester issue
//  data --> check --> same year and same semester
// ! Pre hook
academicSemesterSchema.pre("save", async function (next) {
  // checking with pre hook, before saving the data in database, that whether the data which is being saved from the instance of the schema. here, this refers to the current instance of the schema that is about to be saved in the database.
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(
      status.CONFLICT,
      "Semester already exists for the same year."
    );
  }
  next();
});
// create model
const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  "AcademicSemester",
  academicSemesterSchema
);

export default AcademicSemester;
