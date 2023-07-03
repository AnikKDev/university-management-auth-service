import status from "http-status";
import { SortOrder } from "mongoose";
import ApiError from "../../errors/ApiError";
import { paginationHelper } from "../../helpers/paginationHelpers";
import { PaginationOptions } from "../../shared/pagination";
import {
  academicSemesterTitleCodeMapper,
  searchableAcademicSemester,
} from "./academicSemester.constant";
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
  const { searchTerm, ...filtersData } = filters;

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
  const result = await AcademicSemester.find(whereCondition)
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

// for single semester
export const getSingleSemesterService = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};
// for updating a single semester
export const updateSingleSemesterService = async (
  id: string,
  updatedData: Partial<IAcademicSemester>
) => {
  if (
    updatedData.title &&
    updatedData.code &&
    academicSemesterTitleCodeMapper[updatedData.title] !== updatedData.code
  ) {
    throw new ApiError(status.BAD_REQUEST, "Invalid semester code");
  }
  const result = await AcademicSemester.findOneAndUpdate(
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
