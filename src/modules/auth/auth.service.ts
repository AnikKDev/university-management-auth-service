import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import { createToken } from "../../helpers/JWThelper";
import Users from "../users/users.model";
import { ILoginUser, ILoginUserResponse } from "./auth.interface";

export const loginUserService = async (
  data: ILoginUser
): Promise<ILoginUserResponse> => {
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
  // token

  const accessToken = createToken(
    { id: isUserExists?.id, role: isUserExists?.role },
    config.jwt.secret as Secret,
    config.jwt.jwt_expiry as string
  );
  const refreshToken = createToken(
    { id: isUserExists?.id, role: isUserExists?.role },
    config.jwt.refresh_token as Secret,
    config.jwt.jwt_expiry_refresh as string
  );
  console.log(accessToken, refreshToken, isUserExists.needPasswordChange);
  return {
    accessToken,
    refreshToken,
    needPasswordChange: isUserExists.needPasswordChange,
  };
};
