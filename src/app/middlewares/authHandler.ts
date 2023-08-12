import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import { ENUM_USER_ROLE } from "../../enums/users";
import ApiError from "../../errors/ApiError";
import { verifyJwtToken } from "../../helpers/JWThelper";

type IMyRequest = {
  user: {
    role: ENUM_USER_ROLE;
    id: string;
  };
} & Request;

const authHanlder = (...requiredRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get auth token
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized access");
      }
      //   verify authorization token
      const verifiedUser = verifyJwtToken(token, config.jwt.secret as Secret);
      if (!verifiedUser) {
        throw new ApiError(httpStatus.FORBIDDEN, "Invalid authorization");
      }
      req.user = verifiedUser; // role, id
      // role based authentication
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden access");
      }
      // if successful authentication done, then let the user go to the controller
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default authHanlder;
