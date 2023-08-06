import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { loginUserService } from "./auth.service";

export const loginUserController = catchAsync(
  async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await loginUserService(loginData);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "user logged in successfully",
      data: result,
    });
    console.log(req.body);
  }
);
