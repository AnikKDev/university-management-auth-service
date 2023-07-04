import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { paginationQueries } from "../../constants/pagination.constants";
import { catchAsync } from "../../shared/catchAsync";
import { pickQuery } from "../../shared/pick";
import { sendResponse } from "../../shared/sendResponse";
import { filterableAcademicSemester } from "./academicSemester.constant";
import { IAcademicSemester } from "./academicSemester.interface";
import {
  createAcademicSemesterService,
  deleteSingleSemesterService,
  getAllSemestersService,
  getSingleSemesterService,
  updateSingleSemesterService,
} from "./academicSemester.service";

export const createAcademicSemesterController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await createAcademicSemesterService(academicSemesterData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester created successfully",
      data: result,
      meta: {},
    });
    next();
  }
);

// get semesters
export const getAllSemestersController = catchAsync(
  async (req: Request, res: Response) => {
    // for search filter
    const filters = pickQuery(req.query, filterableAcademicSemester);

    // obj for holding pagination filters
    const paginationOptions = pickQuery(req.query, paginationQueries);
    // console.log(paginationOptions);
    const result = await getAllSemestersService(paginationOptions, filters);
    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Got all the semesters",
      meta: result.meta,
      data: result.data,
    });
    // next();
  }
);
// get single semester
export const getSingleSemesterController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getSingleSemesterService(id);
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Got semester data",
      data: result,
    });
  }
);

export const updateSingleSemesterController = catchAsync(
  async (req: Request, res: Response) => {
    const { id, updatedData } = req.body;
    const result = await updateSingleSemesterService(id, updatedData);
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Updated semester data",
      data: result,
    });
  }
);
export const deleteSingleSemesterController = catchAsync(
  async (req: Request, res: Response) => {
    //
    const result = await deleteSingleSemesterService(req.body.id);
    sendResponse(res, {
      message: "Semester deleted successfully",
      statusCode: httpStatus.OK,
      success: true,
      data: result,
    });
  }
);
