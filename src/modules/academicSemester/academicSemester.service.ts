import status from "http-status";
import ApiError from "../../errors/ApiError";
import { academicSemesterTitleCodeMapper } from "./academicSemester.constant";
import { IAcademicSemester } from "./academicSemester.interface";
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
