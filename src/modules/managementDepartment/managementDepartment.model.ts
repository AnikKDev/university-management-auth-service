import httpStatus from "http-status";
import mongoose, { Schema } from "mongoose";
import ApiError from "../../errors/ApiError";
import {
  IManagementDepartement,
  IManagementDepartementModel,
} from "./managementDepartment.interface";

const managementDepartmentSchema = new Schema<
  IManagementDepartement,
  IManagementDepartementModel
>(
  {
    title: String,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
// pre
managementDepartmentSchema.pre("save", async function () {
  const isExist = await ManagementDepartment.findOne({ title: this.title });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "ManagementDepartment already exists"
    );
  }
});

const ManagementDepartment = mongoose.model(
  "ManagementDepartment",
  managementDepartmentSchema
);
export default ManagementDepartment;
