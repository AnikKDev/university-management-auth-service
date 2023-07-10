import httpStatus from "http-status";
import mongoose from "mongoose";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import AcademicSemester from "../academicSemester/academicSemesterModel";
import { IStudent } from "../student/student.interface";
import Students from "../student/student.model";
import IUser from "./users.interface";
import Users from "./users.model";
import { generateStudentId } from "./users.utils";

export const createStudentService = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  let newUserAllData = null;
  // assigning default password if not already assigned
  if (!user.password) {
    // i am sure it is a string. so , assigning a type alias for it as string
    user.password = config.default_student_password as string;
  }
  // set role
  user.role = "student";
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  ).lean();
  // transaction and rollback
  // starting session
  const session = await mongoose.startSession();
  try {
    // starting the transaction
    session.startTransaction();
    // first database action --> generating student id
    const id = await generateStudentId(academicSemester as IAcademicSemester);
    user.id = id;
    student.id = id;
    // second database action --> creating the student
    // ? we will send the data to create as an array as we are using transaction here
    const createdStudent = await Students.create([student], { session });
    if (!createdStudent.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Coudn't create student --> failed in second database action"
      );
    }
    // second database action --> creating the new user
    // ? created student var will be an array because we are using transaction here
    user.student = createdStudent[0]._id;
    const createdUser = await Users.create([user], { session });
    //   checking errors
    if (!createdUser.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Failed to create user  --> failed in third database action"
      );
    }
    newUserAllData = createdUser[0];

    // committing the transaction
    await session.commitTransaction();
    // ending the session
    await session.endSession();
  } catch (error) {
    // if error occurs in any of those previous database actions, abort the transaction
    await session.abortTransaction();
    // end the session
    await session.endSession();
    throw error;
  }
  // user --> student, student --> academicSemester, academicFaculty, academicDepartment
  if (newUserAllData) {
    newUserAllData = await Users.findOne({ id: newUserAllData.id }).populate({
      path: "student",
      populate: [
        {
          path: "academicSemester",
        },
        {
          path: "academicFaculty",
        },
        {
          path: "academicDepartment",
        },
      ],
    });
  }
  return newUserAllData;
};
