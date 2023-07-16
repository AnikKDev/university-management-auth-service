import { SortOrder } from "mongoose";
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
