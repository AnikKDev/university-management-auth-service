import httpStatus from "http-status";
import { SortOrder } from "mongoose";
import ApiError from "../../errors/ApiError";
import { paginationHelper } from "../../helpers/paginationHelpers";
import { PaginationOptions } from "../../shared/pagination";
import { IGenericResponse } from "../academicSemester/academicSemester.interface";
import { searchableStudent } from "./student.constants";
import { IStudent, IStudentFilter } from "./student.interface";
import Students from "./student.model";

export const getAllStudentsService = async (
  paginationOptions: PaginationOptions,
  filters: IStudentFilter
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: searchableStudent.map(field => ({
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
  const result = await Students.find(whereCondition)
    .populate("academicSemester")
    .populate("academicFaculty")
    .populate("academicDepartment")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const totalData = await Students.countDocuments(result);
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
export const getSingleStudentService = async (
  id: string
): Promise<IStudent | null> => {
  const result = await Students.findById(id);
  return result;
};
// for updating a single semester
export const updateSingleStudentService = async (
  id: string,
  updatedData: Partial<IStudent>
) => {
  // check whether the data exists
  const isExist = await Students.findById(id);
  if (!isExist) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "The student that you are trying to update is not found"
    );
  }
  const { name, guardian, localGuardian, ...studentData } = updatedData;
  const updatedStudentData: Partial<IStudent> = { ...studentData };
  // handle updating the specified data dynamically
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}`;
      (updatedStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian];
    });
  }
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey = `localGuardian.${key}`;
      (updatedStudentData as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }
  const result = await Students.findOneAndUpdate(
    { _id: id },
    updatedStudentData,
    {
      new: true,
    }
  );
  return result;
};

// delete single semester
export const deleteSingleStudentService = async (
  id: string
): Promise<IStudent | null> => {
  const result = await Students.findByIdAndDelete(id);
  return result;
};
