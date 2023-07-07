import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationQueries } from "../../constants/pagination.constants";
import { catchAsync } from "../../shared/catchAsync";
import { pickQuery } from "../../shared/pick";
import { sendResponse } from "../../shared/sendResponse";
import { filterableAcademicDepartment } from "./academicDepartment.constant";
import { IAcademicDepartment } from "./academicDepartment.interface";
import {
  createAcademicDepartmentService,
  deleteSingleDepartmentService,
  getAllAcademicDepartmentService,
  getSingleDepartmentService,
  updateSingleDepartmentService,
} from "./academicDepartment.service";

export const createAcademicDepartmentController = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicDepartmentData } = req.body;
    const result = await createAcademicDepartmentService(
      academicDepartmentData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Department created successfully",
      data: result,
      meta: {},
    });
  }
);

// get Departments
export const getAllDepartmentsController = catchAsync(
  async (req: Request, res: Response) => {
    // for search filter
    const filters = pickQuery(req.query, filterableAcademicDepartment);

    // obj for holding pagination filters
    const paginationOptions = pickQuery(req.query, paginationQueries);
    // console.log(paginationOptions);
    const result = await getAllAcademicDepartmentService(
      paginationOptions,
      filters
    );
    sendResponse<IAcademicDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Got all the Departments",
      meta: result.meta,
      data: result.data,
    });
  }
);
// get single Department
export const getSingleDepartmentController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getSingleDepartmentService(id);
    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Got Department data",
      data: result,
    });
  }
);

export const updateSingleDepartmentController = catchAsync(
  async (req: Request, res: Response) => {
    const { id, updatedData } = req.body;
    const result = await updateSingleDepartmentService(id, updatedData);
    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Updated Department data",
      data: result,
    });
  }
);
export const deleteSingleDepartmentController = catchAsync(
  async (req: Request, res: Response) => {
    //
    const result = await deleteSingleDepartmentService(req.body.id);
    sendResponse(res, {
      message: "Department deleted successfully",
      statusCode: httpStatus.OK,
      success: true,
      data: result,
    });
  }
);
