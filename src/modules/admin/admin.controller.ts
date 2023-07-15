import { Request, Response } from "express";
import { OK } from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { createAdminService } from "../users/users.service";

export const createAdminController = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;
    const result = await createAdminService(admin, userData);
    sendResponse(res, {
      message: "Create Admin",
      success: true,
      statusCode: OK,
      data: result,
    });
  }
);
