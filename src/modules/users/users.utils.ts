import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import Users from "./users.model";
export const findLastStudentId = async (): Promise<string | undefined> => {
  // get users in descending order based on creation and then lean them to get the data not as a document but as a clean object
  const lastStudent = await Users.findOne(
    { role: "student" },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};
export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const currentUserId =
    (await findLastStudentId()) || String(0).padStart(5, "0");
  let incrementedId = (parseInt(currentUserId) + 1).toString().padStart(5, "0");
  // 2025 --> 25
  incrementedId = `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${incrementedId}`;
  // console.log(incrementedId);
  return incrementedId;
  //   return String(lastUserId).padStart(5, "0");
};

export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await Users.findOne(
    { role: "faculty" },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastFaculty?.id ? lastFaculty?.id.substring(2) : undefined;
};
export const generateFacultyId = async (): Promise<string> => {
  const currentFacultyId =
    (await findLastFacultyId()) || (0).toString().padStart(5, "0");
  let incrementedFacultyId = (parseInt(currentFacultyId) + 1)
    .toString()
    .padStart(5, "0");
  incrementedFacultyId = `F-${incrementedFacultyId}`;
  console.log(incrementedFacultyId);
  return incrementedFacultyId;
};
