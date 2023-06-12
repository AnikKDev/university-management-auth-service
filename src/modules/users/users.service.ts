import config from "../../config";
import IUser from "./users.interface";
import Users from "./users.model";
import { generateUserId } from "./users.utils";

export const createUserService = async (data: IUser): Promise<IUser | null> => {
  // generate incremental userId
  const id = await generateUserId();
  data.id = id;
  // assigning default password if not already assigned
  if (!data.password) {
    // i am sure it is a string. so , assigning a type alias for it as string
    data.password = config.default_student_password as string;
  }
  const createdUser = await Users.create(data);
  //   checking errors
  if (!createdUser) {
    throw new Error("Failed to create user");
  }
  return createdUser;
};
