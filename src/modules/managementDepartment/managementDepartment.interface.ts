import { Model } from "mongoose";

export type IManagementDepartement = {
  title: string;
};
export type IManagementDepartementModel = Model<IManagementDepartement>;
