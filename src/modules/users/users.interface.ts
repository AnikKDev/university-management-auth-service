import { Model } from "mongoose";

type IUser = {
  id: string;
  role: string;
  password: string;
};
export type UsersModel = Model<IUser, Record<string, unknown>>;

export default IUser;
