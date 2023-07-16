import { Model, Types } from "mongoose";
import { IManagementDepartement } from "../managementDepartment/managementDepartment.interface";

export type IAdminName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
enum gender {
  Male = "male",
  Female = "female",
}
enum bloodGroup {
  "A+",
  "B+",
  "AB+",
  "O+",
  "A-",
  "B-",
  "AB-",
}
export type IAdmin = {
  id: string;
  name: IAdminName;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  gender: gender;
  permanentAddress: string;
  presentAddress: string;
  bloodGroup?: bloodGroup;
  managementDepartment: Types.ObjectId | IManagementDepartement;
  designation: string;
  profileImage?: string;
};
export type IAdminModel = Model<IAdmin, Record<string, unknown>>;
export type IAdminFilters = {
  searchTerm?: string;
};
