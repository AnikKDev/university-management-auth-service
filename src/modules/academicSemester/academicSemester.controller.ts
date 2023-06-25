import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { createAcademicSemesterService } from "./academicSemester.service";

export const createAcademicSemesterController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // try {
    const { ...academicSemesterData } = req.body;
    const result = await createAcademicSemesterService(academicSemesterData);
    /*  res.status(200).json({
      success: true,
      message: "Semester created successfully",
      data: result,
    }); */
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester created successfully",
      data: result,
    });
    next();
    // } catch (error) {
    //   next(error);
    // }
  }
);
