import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
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
      // required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "Students",
    },
    faculty: {
      type: Schema.Types.ObjectId,
      // ref: "AcademicFaculty",
      ref: "AcademicFacultyDetaileds",
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
// pre method
userSchema.pre("save", async function (next) {
  // hashing user password
  this.password = await bcrypt.hash(
    this.password as string,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});
// create model
const Users = model<IUser, UsersModel>("Users", userSchema);

export default Users;
