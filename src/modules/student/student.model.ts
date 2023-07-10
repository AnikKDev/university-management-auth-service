import mongoose, { Schema } from "mongoose";
import { gender } from "./student.constants";
import { IStudent, IStudentModel } from "./student.interface";

export const studentSchema = new Schema<IStudent, IStudentModel>(
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
      enum: gender,
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
    guardian: {
      type: {
        fatherName: {
          type: String,
          required: true,
        },
        fatherContactNo: {
          type: String,
          required: true,
        },
        fatherOccupation: {
          type: String,
          required: true,
        },
        motherName: {
          type: String,
          required: true,
        },
        motherContactNo: {
          type: String,
          required: true,
        },
        motherOccupation: {
          type: String,
          required: true,
        },
      },
    },
    localGuardian: {
      type: {
        name: {
          type: String,
          required: true,
        },
        contactNo: {
          type: String,
          required: true,
        },
        occupation: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
      },
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
    academicSemester: {
      type: mongoose.Types.ObjectId,
      ref: "AcademicSemester",
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

const Students = mongoose.model("Students", studentSchema);
export default Students;
