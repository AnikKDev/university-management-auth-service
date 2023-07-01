import status from "http-status";
import { SortOrder } from "mongoose";
import ApiError from "../../errors/ApiError";
import { paginationHelper } from "../../helpers/paginationHelpers";
import { PaginationOptions } from "../../shared/pagination";
import { academicSemesterTitleCodeMapper } from "./academicSemester.constant";
import {
  IAcademicSemester,
  IAcademicSemesterFilter,
  IGenericResponse,
} from "./academicSemester.interface";
import AcademicSemester from "./academicSemesterModel";
export const createAcademicSemesterService = async (
  data: IAcademicSemester
): Promise<IAcademicSemester> => {
  // check session with the code
  // !==> amra academicSemesterTitleCodeMapper er jei object ta aseh, shekhane req theke asha title er shathe milaye value ta nitesi. ar req body theke asha code er shathe match kortesi. jodi same hoy tahole okay. else, bad requuest
  if (academicSemesterTitleCodeMapper[data.title] !== data.code) {
    throw new ApiError(status.BAD_REQUEST, "Invalid semester code");
  }
  const result = await AcademicSemester.create(data);
  return result;
};

export const getAllSemestersService = async (
  paginationOptions: PaginationOptions,
  filters: IAcademicSemesterFilter
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchTerm } = filters;
  const searchableAcademicSemester = ["title", "code", "year"];
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: searchableAcademicSemester.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
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
  const result = await AcademicSemester.find({ $and: andConditions })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const totalData = await AcademicSemester.countDocuments();
  return {
    meta: {
      page: page,
      limit: limit,
      totalData: totalData,
    },
    data: result,
  };
};
