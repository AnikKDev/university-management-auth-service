import { IAcademicSemester } from "./academicSemester.interface";
import AcademicSemester from "./academicSemesterModel";

export const createAcademicSemesterService = async (
  data: IAcademicSemester
): Promise<IAcademicSemester> => {
  const result = await AcademicSemester.create(data);
  return result;
};
