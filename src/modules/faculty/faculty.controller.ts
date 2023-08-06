import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationQueries } from "../../constants/pagination.constants";
import { catchAsync } from "../../shared/catchAsync";
import { pickQuery } from "../../shared/pick";
import { sendResponse } from "../../shared/sendResponse";
import { facultyFilterableFields } from "./faculty.constant";
import { IFaculty } from "./faculty.interface";
import {
  deleteFacultyService,
  getAllFacultiesService,
  getSingleFacultyService,
  updateFacultyService,
} from "./faculty.service";
/* import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { facultyFilterableFields } from './faculty.constant';
import { IFaculty } from './faculty.interface';
import { FacultyService } from './faculty.service'; */

export const getAllFaculties = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pickQuery(req.query, facultyFilterableFields);
    const paginationOptions = pickQuery(req.query, paginationQueries);

    const result = await getAllFacultiesService(filters, paginationOptions);

    sendResponse<IFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "faculties retrieved successfully !",
      meta: result.meta,
      data: result.data,
    });
  }
);

export const getSingleFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await getSingleFacultyService(id);

    sendResponse<IFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "faculty retrieved successfully !",
      data: result,
    });
  }
);

export const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await updateFacultyService(id, updatedData);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "faculty updated successfully !",
    data: result,
  });
});

export const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await deleteFacultyService(id);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "faculty deleted successfully !",
    data: result,
  });
});
