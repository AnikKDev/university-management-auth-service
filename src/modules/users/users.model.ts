import { Schema, model } from "mongoose";
import IUser, { UsersModel } from "./users.interface";

// for future usage
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
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
// create model
const Users = model<IUser, UsersModel>("Users", userSchema);

export default Users;
