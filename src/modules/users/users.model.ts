import { Model, Schema, model } from "mongoose";
import IUser from "./users.interface";

// for future usage
type UsersModel = Model<IUser, object>;
const userSchema = new Schema<IUser>(
  {
    // custom made id (not from mongoose)
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
// create model
const Users = model<IUser, UsersModel>("Users", userSchema);

export default Users;
