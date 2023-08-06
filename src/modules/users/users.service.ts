import httpStatus from "http-status";
import mongoose from "mongoose";
import config from "../../config";
import ApiError from "../../errors/ApiError";

import { IUserAcademicFaculty } from "../academicFaculty/academicFaculty.interface";
import AcademicFacultyDetaileds from "../academicFaculty/academicFacultyDetailed.model";
import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import AcademicSemester from "../academicSemester/academicSemesterModel";
import { IAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.model";
import { IStudent } from "../student/student.interface";
import Students from "../student/student.model";
import IUser from "./users.interface";
import Users from "./users.model";
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "./users.utils";

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

// creating faculty
export const createFacultyService = async (
  faculty: IUserAcademicFaculty,
  user: IUser
): Promise<IUser | null> => {
  let newFacultyAlldata = null;
  if (!user.password) {
    user.password = config.default_student_password as string;
  }
  user.role = "faculty";

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;
    const createFaculty = await AcademicFacultyDetaileds.create([faculty], {
      session,
    });
    if (!createFaculty.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Failed to create faculty (faculty)  --> failed in third database action"
      );
    }
    user.faculty = createFaculty[0]._id;
    const createUser = await Users.create([user], { session });
    if (!createUser.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Failed to create user (faculty)  --> failed in third database action"
      );
    }
    newFacultyAlldata = createUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newFacultyAlldata) {
    newFacultyAlldata = await Users.findOne({
      id: newFacultyAlldata.id,
    }).populate("faculty");
    console.log(newFacultyAlldata);
  }
  return newFacultyAlldata;
};

// for admin
export const createAdminService = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  let newUserAllData = null;
  if (!user.password) {
    user.password = config.default_student_password as string;
  }
  user.role = "admin";
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // create | generate id
    const id = await generateAdminId();
    user.id = id;
    admin.id = id;
    const createdAdmin = await Admin.create([admin], { session });
    if (!createdAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Couldn't create admin");
    }
    user.admin = createdAdmin[0]._id;
    // create user after creating the admin in admin collection
    const createdUser = await Users.create([user], { session });
    if (!createdUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "couldn't create user");
    }
    newUserAllData = createdUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await Users.findOne({ id: newUserAllData.id }).populate({
      path: "admin",
      populate: [
        {
          path: "managementDepartment",
        },
      ],
    });
  }
  return newUserAllData;
};
