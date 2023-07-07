import { SortOrder } from "mongoose";
import { paginationHelper } from "../../helpers/paginationHelpers";
import { PaginationOptions } from "../../shared/pagination";
import { IGenericResponse } from "../academicSemester/academicSemester.interface";
import { searchableAcademicDepartment } from "./academicDepartment.constant";
import {
  IAcademicDepartment,
  IAcademicDepartmentFilter,
} from "./academicDepartment.interface";
import AcademicDepartment from "./academicDepartmentModel";

export const createAcademicDepartmentService = async (
  data: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const result = await AcademicDepartment.create(data);
  return result;
};

export const getAllAcademicDepartmentService = async (
  paginationOptions: PaginationOptions,
  filters: IAcademicDepartmentFilter
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: searchableAcademicDepartment.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  // for filters data
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  /* const andConditions = [
    {
      $or: [
        {
          title: {
            // to match whatever the search term with the title
            $regex: searchTerm,
            // for case insensitive
            $options: "i",
          },
        },
        {
          code: {
            // to match whatever the search term with the title
            $regex: searchTerm,
            // for case insensitive
            $options: "i",
          },
        },
        {
          year: {
            // to match whatever the search term with the title
            $regex: searchTerm,
            // for case insensitive
            $options: "i",
          },
        },
      ],
    },
  ]; */

  // =================================================================
  // const { page = 1, limit = 10 } = paginationOptions;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortOrder && sortBy) {
    sortConditions[sortBy] = sortOrder;
  }
  // where condition --> jodi and condition thake tahole eta, othoba empty object
  const whereCondition = andConditions.length ? { $and: andConditions } : {};
  const result = await AcademicDepartment.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate("academicFacultyId");
  const totalData = await AcademicDepartment.countDocuments();
  return {
    meta: {
      page: page,
      limit: limit,
      totalData: totalData,
    },
    data: result,
  };
};

// for single semester
export const getSingleDepartmentService = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id);
  return result;
};
// for updating a single semester
export const updateSingleDepartmentService = async (
  id: string,
  updatedData: Partial<IAcademicDepartment>
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    updatedData,
    {
      new: true,
    }
  );
  return result;
};

//? ensure 1 : Route level --> If you want to update title or code either one of them, you have to give both
//? ensure 2 : Service level --> mapping title with code

// delete single semester
export const deleteSingleDepartmentService = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id);
  return result;
};
