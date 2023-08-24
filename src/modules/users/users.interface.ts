import { HydratedDocument, Model, Types } from "mongoose";
import { IStudent } from "../student/student.interface";

type IUser = {
  id: string;
  role: string;
  password?: string;
  student?: Types.ObjectId | IStudent;
  admin?: Types.ObjectId;
  faculty?: Types.ObjectId;
  needPasswordChange?: boolean;
  passwordChangedAt: Date;
};
export type IUserMethods = {
  isUserExists(id: string): Promise<Partial<IUser> | null>;
  /* isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>; */
};
/* export type IUserModel = {
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser, IUserMethods>; */
export type UsersModel = {
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<HydratedDocument<IUser, IUserMethods>>;
} & Model<IUser, Record<string, never>, IUserMethods>;

/* export type UsersModel = Model<
  IUser,
  Record<string, unknown>,
  IUserMethods
  // IUserModel
>; */

export default IUser;
