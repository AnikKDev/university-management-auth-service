import mongoose, { Schema } from "mongoose";
import {
  IUserAcademicFaculty,
  IUserAcademicFacultyModel,
} from "./academicFaculty.interface";

export const AcademicFacultyDetailedsSchema = new Schema<
  IUserAcademicFaculty,
  IUserAcademicFacultyModel
>(
  {
    id: {
      type: String,
      required: [true, "Id is required"],
      unique: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        middleName: String,
        lastName: {
          type: String,
          required: true,
        },
      },
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-"],
    },
    email: {
      type: String,
      unique: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },

    profileImg: {
      type: String,
      // required: true,
    },
    academicFaculty: {
      type: mongoose.Types.ObjectId,
      ref: "AcademicFaculty",
      required: true,
    },
    academicDepartment: {
      type: mongoose.Types.ObjectId,
      ref: "AcademicDepartment",
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

const AcademicFacultyDetaileds = mongoose.model(
  "AcademicFacultyDetaileds",
  AcademicFacultyDetailedsSchema
);
export default AcademicFacultyDetaileds;
