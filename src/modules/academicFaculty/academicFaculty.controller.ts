import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import {
  createAcademicFacultyService,
  deleteAcademicFacultyService,
  getAcademicFacultyService,
  updateAcademicFacultyService,
} from "./academicFaculty.service";

export const createAcademicFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await createAcademicFacultyService(req.body);
    sendResponse(res, {
      message: "Created academicFaculty successfully ",
      statusCode: httpStatus.OK,
      success: true,
      data: result,
    });
  }
);
export const getAcademicFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getAcademicFacultyService(req.body.id);
    sendResponse(res, {
      message: "Got Academic Faculty successfully ",
      statusCode: httpStatus.OK,
      success: true,
      data: result,
    });
  }
);
export const deleteAcademicFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await deleteAcademicFacultyService(req.body.id);
    sendResponse(res, {
      message: "Deleted Academic Faculty successfully ",
      statusCode: httpStatus.OK,
      success: true,
      data: result,
    });
  }
);
export const updateAcademicFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await updateAcademicFacultyService(
      req.body.id,
      req.body.data
    );
    sendResponse(res, {
      message: "Updated Academic Faculty successfully ",
      statusCode: httpStatus.OK,
      success: true,
      data: result,
    });
  }
);
