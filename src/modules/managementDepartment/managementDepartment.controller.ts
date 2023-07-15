import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { IManagementDepartement } from "./managementDepartment.interface";
import { createManagementDepartmentService } from "./managementDepartment.service";

export const createManagementDepartmentController = catchAsync(
  async (req: Request, res: Response) => {
    const { ...managementDepartmentData } = req.body;
    const result = await createManagementDepartmentService(
      managementDepartmentData as IManagementDepartement
    );
    sendResponse(res, {
      message: "Successfully created the management department",
      statusCode: httpStatus.OK,
      success: true,
      data: result,
    });
  }
);
