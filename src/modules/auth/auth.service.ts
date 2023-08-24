import { hash } from "bcrypt";
import httpStatus from "http-status";
import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import { createToken, verifyJwtToken } from "../../helpers/JWThelper";
import Users from "../users/users.model";
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "./auth.interface";
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
  return {
    accessToken,
    refreshToken,
    needPasswordChange: isUserExists.needPasswordChange,
  };
};

export const refreshTokenService = async (
  token: string
): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = verifyJwtToken(token, config.jwt.refresh_token as Secret);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid refresh token");
  }
  const { id, role } = verifiedToken;
  const userData = new Users();
  const isUserExist = await userData.isUserExists(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist");
  }
  // generate new token
  const newAccessToken = createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.jwt_expiry_refresh as string
  );
  return {
    accessToken: newAccessToken,
  };
};

export const changePasswordService = async (
  passwordData: { oldPassword: string; newPassword: string },
  loggedinUserData: JwtPayload | null
): Promise<void> => {
  const { oldPassword, newPassword } = passwordData;
  /*   const isUserExists = await Users.findOne(
    { id },
    { id: 1, password: 1, needPasswordChange: 1 }
  ).lean(); */
  const user = new Users();
  // console.log(loggedinUserData);
  const isUserExists = await user.isUserExists(loggedinUserData?.id);
  if (!isUserExists) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `user with this id: ${loggedinUserData?.id} does not exist`
    );
  }
  /* const isPasswordMatched = bcrypt.compare(
    password,
    isUserExists?.password
  ); */
  if (
    isUserExists.password &&
    !(await Users.isPasswordMatched(oldPassword, isUserExists?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "password is incorrect");
  }
  const newHashedPassword = await hash(newPassword.toString(), 12);
  await Users.findOneAndUpdate(
    { id: loggedinUserData?.id },
    {
      password: newHashedPassword,
      needPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  );
  return;
};
