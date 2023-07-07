import httpStatus from "http-status";
import mongoose, { Schema, model } from "mongoose";
import ApiError from "../../errors/ApiError";
import {
  IAcademicDepartment,
  IAcademicDepartmentModel,
} from "./academicDepartment.interface";

const academicDepartmentSchema = new mongoose.Schema<IAcademicDepartment>(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      unique: true,
    },
    academicFacultyId: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

academicDepartmentSchema.pre("save", async function (next) {
  const isExist = await AcademicDepartment.findOne({
    title: this.title,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "Academic Department already exists"
    );
  }
  next();
});

const AcademicDepartment = model<IAcademicDepartment, IAcademicDepartmentModel>(
  "AcademicDepartment",
  academicDepartmentSchema
);
export default AcademicDepartment;
