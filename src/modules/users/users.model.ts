import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
import IUser, { IUserMethods, UsersModel } from "./users.interface";
// for future usage
const userSchema = new Schema<
  IUser,
  Record<string, never>,
  UsersModel,
  IUserMethods
>(
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
      select: 0,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
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

// methods
userSchema.methods.isUserExists = async function (
  id: string
): Promise<Partial<IUser> | null> {
  const user = await Users.findOne(
    { id },
    { id: 1, password: 1, needPasswordChange: 1, role: 1 }
  );
  return user;
};
userSchema.static(
  "isPasswordMatched",
  async function isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ) {
    const isMatched = await bcrypt.compare(givenPassword, savedPassword);
    return isMatched;
  }
);
/* userSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const isMatched = await bcrypt.compare(givenPassword, savedPassword);
  return isMatched;
};
 */

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
