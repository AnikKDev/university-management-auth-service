import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { createFacultyService, createStudentService } from "./users.service";

export const createStudentController = catchAsync(
  async (req: Request, res: Response) => {
    // try {
    /* 
    {
      password?:"",
      student:""
    }
    */

    const { student, ...userData } = req.body;

    const result = await createStudentService(student, userData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User created successfully",
      data: result,
    });
    /* res.status(200).json({
      success: true,
      message: "User created successfully",
      data: result,
    }); */
    // }
    // catch (err) {
    // res.status(400).json({ success: false, message: "Failed to create user" });
    // sending the error to global error handler (globalErrorHandler) next function . as there is no middleware has been declared or called, it will automatically go to the global error handler
    // next(err);
    // }
  }
);

export const createFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body;
    const result = await createFacultyService(faculty, userData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Creates user successfully",
      data: result,
    });
  }
);
