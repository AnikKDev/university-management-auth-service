import { Model, Types } from "mongoose";
import { IStudent } from "../student/student.interface";

type IUser = {
  id: string;
  role: string;
  password?: string;
  student?: Types.ObjectId | IStudent;
  admin?: Types.ObjectId;
  faculty?: Types.ObjectId;
};
export type UsersModel = Model<IUser, Record<string, unknown>>;

export default IUser;
