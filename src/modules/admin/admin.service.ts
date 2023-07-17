import httpStatus from "http-status";
import { SortOrder } from "mongoose";
import ApiError from "../../errors/ApiError";
import { paginationHelper } from "../../helpers/paginationHelpers";
import { PaginationOptions } from "../../shared/pagination";
import { IGenericResponse } from "../academicSemester/academicSemester.interface";
import { searchableAdmin } from "./admin.constants";
import { IAdmin, IAdminFilters } from "./admin.interface";
import Admin from "./admin.model";

export const getAllAdminsService = async (
  filters: IAdminFilters,
  paginationOptions: PaginationOptions
): Promise<IGenericResponse<IAdmin[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  //   console.log(filters);
  if (searchTerm) {
    andConditions.push({
      $or: searchableAdmin.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
    /* 
    {
  $or: [
    { username: { $regex: 'John', $options: 'i' } },
    { email: { $regex: 'John', $options: 'i' } },
  ]
}
    */
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // pagination filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortOrder && sortBy) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereCondition = andConditions.length
    ? {
        $and: andConditions,
      }
    : {};
  const result = await Admin.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate("managementDepartment");
  const totalData = await Admin.countDocuments(whereCondition);
  return {
    meta: {
      page: page,
      limit: limit,
      totalData: totalData,
    },
    data: result,
  };
};

// get single admin
export const getSingleAdminService = async (
  adminId: string
): Promise<IAdmin | null> => {
  const result = await Admin.findById(adminId).populate("managementDepartment");
  return result;
};

// update single admin
export const updateSingleAdminService = async (
  adminId: string,
  data: Partial<IAdmin>
): Promise<IAdmin | null> => {
  // check if exists
  const isExist = await Admin.findById(adminId).lean();
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin not found");
  }
  const { name, ...adminData } = data;
  const updatedAdminData: Partial<IAdmin> = { ...adminData };
  if (name && Object.keys(name).length) {
    Object.keys(name).forEach(item => {
      const nameKey = `name.${item}`;
      (updatedAdminData as any)[nameKey] = name[item as keyof typeof name];
    });
  }
  const result = await Admin.findOneAndUpdate({ _id: adminId }, data, {
    new: true,
  });
  return result;
};

// delete service
export const deleteSingleAdminService = async (
  id: string
): Promise<IAdmin | null> => {
  const isExist = await Admin.findById(id).lean();
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin can not be found");
  }
  const result = await Admin.findOneAndDelete({ _id: id });
  return result;
};
