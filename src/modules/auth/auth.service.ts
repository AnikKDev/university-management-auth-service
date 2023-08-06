import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import Users from "../users/users.model";
import { ILoginUser } from "./auth.interface";
export const loginUserService = async (data: ILoginUser) => {
  const { id, password } = data;
  /*   const isUserExists = await Users.findOne(
    { id },
    { id: 1, password: 1, needPasswordChange: 1 }
  ).lean(); */
  const user = new Users();
  const isUserExists = await user.isUserExists(id);

  if (!isUserExists) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `user with this id: ${id} does not exist`
    );
  }
  /* const isPasswordMatched = bcrypt.compare(
    password,
    isUserExists?.password
  ); */
  if (
    isUserExists.password &&
    !(await Users.isPasswordMatched(password, isUserExists?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "password is incorrect");
  }

  return {
    // isUserExists?.needPasswordChange,accessToken
  };
};
