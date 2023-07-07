import httpStatus from "http-status";
import { Schema, model } from "mongoose";
import ApiError from "../../errors/ApiError";
import {
  IAcademicFaculty,
  IAcademicFacultyModel,
} from "./academicFaculty.interface";

const academicFacultySchema = new Schema<IAcademicFaculty>({
  title: {
    type: "string",
    required: [true, "Please provide a faculty title"],
  },
});

// check whether the faculty already exists or not
academicFacultySchema.pre("save", async function (next) {
  const isFacultyExist = await AcademicFaculty.findOne({ title: this.title });
  if (isFacultyExist) {
    throw new ApiError(httpStatus.CONFLICT, "Faculty already exists");
  } else {
    next();
  }
});

const AcademicFaculty = model<IAcademicFaculty, IAcademicFacultyModel>(
  "AcademicFaculty",
  academicFacultySchema
);

export default AcademicFaculty;
