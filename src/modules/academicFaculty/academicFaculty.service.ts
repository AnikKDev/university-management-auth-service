import { IAcademicFaculty } from "./academicFaculty.interface";
import AcademicFaculty from "./academicFacultyModel";

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
