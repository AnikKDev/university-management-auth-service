import { Request, Response } from "express";
import httpStatus, { OK } from "http-status";
import { paginationQueries } from "../../constants/pagination.constants";
import { catchAsync } from "../../shared/catchAsync";
import { pickQuery } from "../../shared/pick";
import { sendResponse } from "../../shared/sendResponse";
import { createAdminService } from "../users/users.service";
// import { filterableAdmin } from "./admin.constants";
import { adminFilterableFields } from "./admin.constants";
import {
  deleteSingleAdminService,
  getAllAdminsService,
  getSingleAdminService,
  updateSingleAdminService,
} from "./admin.service";

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

export const getAllAdminsController = catchAsync(
  async (req: Request, res: Response) => {
    // to get the filters object based on the filterable admin array field
    const filters = pickQuery(req.query, adminFilterableFields);
    //  to get the pagination object (page, limit, sortOrder, sortBy, etc. based on the pagination queries)
    const paginationOptions = pickQuery(req.query, paginationQueries);
    // console.log(filters);
    // pass the both filters and pagination options to the service
    const result = await getAllAdminsService(filters, paginationOptions);
    // send the response
    sendResponse(res, {
      message: "Got all admins",
      success: true,
      data: result.data,
      statusCode: httpStatus.OK,
      meta: result.meta,
    });
  }
);

// get admin controller
export const getSingleAdminController = catchAsync(
  async (req: Request, res: Response) => {
    const { adminId } = req.params;
    const result = await getSingleAdminService(adminId);
    sendResponse(res, {
      data: result,
      success: true,
      message: "admin details available",
      statusCode: httpStatus.OK,
    });
  }
);

// update admin controller
export const updateSingleAdminController = catchAsync(
  async (req: Request, res: Response) => {
    const { id, data } = req.body;
    const result = await updateSingleAdminService(id, data);
    sendResponse(res, {
      data: result,
      success: true,
      message: "admin updated sucessfully",
      statusCode: httpStatus.OK,
    });
  }
);

// delete admin controller
export const deleteSingleAdminController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await deleteSingleAdminService(id as string);
    sendResponse(res, {
      data: result,
      message: "admin deleted sucessfully",
      statusCode: httpStatus.OK,
      success: true,
    });
  }
);
