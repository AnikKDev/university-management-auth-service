import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationQueries } from "../../constants/pagination.constants";
import { catchAsync } from "../../shared/catchAsync";
import { pickQuery } from "../../shared/pick";
import { sendResponse } from "../../shared/sendResponse";
import { filterableStudent } from "./student.constants";
import { IStudent } from "./student.interface";
import {
  deleteSingleStudentService,
  getAllStudentsService,
  getSingleStudentService,
  updateSingleStudentService,
} from "./student.service";

// get Students
export const getAllStudentController = catchAsync(
  async (req: Request, res: Response) => {
    // for search filter
    const filters = pickQuery(req.query, filterableStudent);

    // obj for holding pagination filters
    const paginationOptions = pickQuery(req.query, paginationQueries);
    // console.log(paginationOptions);
    const result = await getAllStudentsService(paginationOptions, filters);
    sendResponse<IStudent[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Got all the Students",
      meta: result.meta,
      data: result.data,
    });
  }
);
export const getSingleStudentController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getSingleStudentService(id);
    sendResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Got semester data",
      data: result,
    });
  }
);
// get single Student
export const updateSingleStudentController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...updatedData } = req.body;
    const result = await updateSingleStudentService(id, updatedData);
    sendResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "updated Student data",
      data: result,
    });
  }
);

export const deleteSingleStudentController = catchAsync(
  async (req: Request, res: Response) => {
    //
    const result = await deleteSingleStudentService(req.body.id);
    sendResponse(res, {
      message: "Student deleted successfully",
      statusCode: httpStatus.OK,
      success: true,
      data: result,
    });
  }
);
