import { SortOrder } from "mongoose";
import { paginationHelper } from "../../helpers/paginationHelpers";
import { PaginationOptions } from "../../shared/pagination";
import { IGenericResponse } from "../academicSemester/academicSemester.interface";
import { IAcademicFaculty } from "./academicFaculty.interface";
import AcademicFaculty from "./academicFacultyModel";

export const getAllAcademicFacultyService = async (
  paginationOptions: PaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const result = await AcademicFaculty.find({})
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const totalData = await AcademicFaculty.countDocuments();
  return {
    meta: {
      page: page,
      limit: limit,
      totalData: totalData,
    },
    data: result,
  };
};

export const createAcademicFacultyService = async (
  data: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.create(data);
  return result;
};
export const getAcademicFacultyService = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};
export const deleteAcademicFacultyService = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};
export const updateAcademicFacultyService = async (
  id: string,
  data: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};
