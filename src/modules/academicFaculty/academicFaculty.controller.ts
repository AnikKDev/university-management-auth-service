import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationQueries } from "../../constants/pagination.constants";
import { catchAsync } from "../../shared/catchAsync";
import { pickQuery } from "../../shared/pick";
import { sendResponse } from "../../shared/sendResponse";
import { IAcademicFaculty } from "./academicFaculty.interface";
import {
  createAcademicFacultyService,
  deleteAcademicFacultyService,
  getAcademicFacultyService,
  getAllAcademicFacultyService,
  updateAcademicFacultyService,
} from "./academicFaculty.service";
export const getAllAcademicFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pickQuery(req.query, paginationQueries);
    const result = await getAllAcademicFacultyService(paginationOptions);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Got all academic faculties",
      data: result,
    });
  }
);
export const createAcademicFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicFacultyData } = req.body;
    const result = await createAcademicFacultyService(academicFacultyData);
    sendResponse<IAcademicFaculty>(res, {
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
