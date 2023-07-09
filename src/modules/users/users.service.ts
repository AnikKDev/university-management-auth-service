import config from "../../config";
import ApiError from "../../errors/ApiError";
import IUser from "./users.interface";
import Users from "./users.model";
import { generateStudentId } from "./users.utils";

export const createUserService = async (data: IUser): Promise<IUser | null> => {
  // generate incremental userId
  const academicSemester = {
    code: "01",
    year: "2025",
  };
  const id = await generateStudentId(academicSemester);
  data.id = id;
  // assigning default password if not already assigned
  if (!data.password) {
    // i am sure it is a string. so , assigning a type alias for it as string
    data.password = config.default_student_password as string;
  }
  const createdUser = await Users.create(data);
  //   checking errors
  if (!createdUser) {
    throw new ApiError(400, "Failed to create user");
  }
  return createdUser;
};
