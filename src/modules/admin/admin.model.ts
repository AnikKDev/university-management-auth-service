import mongoose, { Schema } from "mongoose";
import { adminGender } from "./admin.constants";
import { IAdmin, IAdminModel } from "./admin.interface";

const adminSchema = new Schema<IAdmin, IAdminModel>(
  {
    id: String,
    name: {
      firstName: String,
      middleName: String,
      lastName: String,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: adminGender,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-"],
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
    managementDepartment: {
      type: mongoose.Types.ObjectId,
      ref: "ManagementDepartment",
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

const Admin = mongoose.model<IAdmin, IAdminModel>("Admin", adminSchema);
export default Admin;
