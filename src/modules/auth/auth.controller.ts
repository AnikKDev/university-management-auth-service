import { Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../config";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { ILoginUserResponse, IRefreshTokenResponse } from "./auth.interface";
import { loginUserService, refreshTokenService } from "./auth.service";

export const loginUserController = catchAsync(
  async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await loginUserService(loginData);
    // set refresh token into cookie
    const { refreshToken, ...others } = result;
    const cookieOptions = {
      secure: config.env === "production",
      httpOnly: true,
    };
    res.cookie("refreshToken", refreshToken, cookieOptions);
    // delete the refresh token from the response so that it can't be seen by others via response
    // delete result.refreshToken; //! not recommended

    sendResponse<ILoginUserResponse>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "user logged in successfully",
      data: others,
    });
  }
);
export const refreshTokenController = catchAsync(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const result = await refreshTokenService(refreshToken);
    // set refresh token into cookie
    const cookieOptions = {
      secure: config.env === "production",
      httpOnly: true,
    };
    res.cookie("refreshToken", refreshToken, cookieOptions);
    // delete the refresh token from the response so that it can't be seen by others via response
    // delete result.refreshToken; //! not recommended

    sendResponse<IRefreshTokenResponse>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "user logged in successfully",
      data: result,
    });
  }
);
