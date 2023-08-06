"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdminService =
  exports.createFacultyService =
  exports.createStudentService =
    void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const academicFacultyDetailed_model_1 = __importDefault(
  require("../academicFaculty/academicFacultyDetailed.model")
);
const academicSemesterModel_1 = __importDefault(
  require("../academicSemester/academicSemesterModel")
);
const admin_model_1 = __importDefault(require("../admin/admin.model"));
const student_model_1 = __importDefault(require("../student/student.model"));
const users_model_1 = __importDefault(require("./users.model"));
const users_utils_1 = require("./users.utils");
const createStudentService = (student, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    let newUserAllData = null;
    // assigning default password if not already assigned
    if (!user.password) {
      // i am sure it is a string. so , assigning a type alias for it as string
      user.password = config_1.default.default_student_password;
    }
    // set role
    user.role = "student";
    const academicSemester = yield academicSemesterModel_1.default
      .findById(student.academicSemester)
      .lean();
    // transaction and rollback
    // starting session
    const session = yield mongoose_1.default.startSession();
    try {
      // starting the transaction
      session.startTransaction();
      // first database action --> generating student id
      const id = yield (0, users_utils_1.generateStudentId)(academicSemester);
      user.id = id;
      student.id = id;
      // second database action --> creating the student
      // ? we will send the data to create as an array as we are using transaction here
      const createdStudent = yield student_model_1.default.create([student], {
        session,
      });
      if (!createdStudent.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          "Coudn't create student --> failed in second database action"
        );
      }
      // second database action --> creating the new user
      // ? created student var will be an array because we are using transaction here
      user.student = createdStudent[0]._id;
      const createdUser = yield users_model_1.default.create([user], {
        session,
      });
      //   checking errors
      if (!createdUser.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          "Failed to create user  --> failed in third database action"
        );
      }
      newUserAllData = createdUser[0];
      // committing the transaction
      yield session.commitTransaction();
      // ending the session
      yield session.endSession();
    } catch (error) {
      // if error occurs in any of those previous database actions, abort the transaction
      yield session.abortTransaction();
      // end the session
      yield session.endSession();
      throw error;
    }
    // user --> student, student --> academicSemester, academicFaculty, academicDepartment
    if (newUserAllData) {
      newUserAllData = yield users_model_1.default
        .findOne({ id: newUserAllData.id })
        .populate({
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
  });
exports.createStudentService = createStudentService;
// creating faculty
const createFacultyService = (faculty, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    let newFacultyAlldata = null;
    if (!user.password) {
      user.password = config_1.default.default_student_password;
    }
    user.role = "faculty";
    const session = yield mongoose_1.default.startSession();
    try {
      session.startTransaction();
      const id = yield (0, users_utils_1.generateFacultyId)();
      user.id = id;
      faculty.id = id;
      const createFaculty =
        yield academicFacultyDetailed_model_1.default.create([faculty], {
          session,
        });
      if (!createFaculty.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          "Failed to create faculty (faculty)  --> failed in third database action"
        );
      }
      user.faculty = createFaculty[0]._id;
      const createUser = yield users_model_1.default.create([user], {
        session,
      });
      if (!createUser.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          "Failed to create user (faculty)  --> failed in third database action"
        );
      }
      newFacultyAlldata = createUser[0];
      yield session.commitTransaction();
      yield session.endSession();
    } catch (error) {
      yield session.abortTransaction();
      yield session.endSession();
      throw error;
    }
    if (newFacultyAlldata) {
      newFacultyAlldata = yield users_model_1.default
        .findOne({
          id: newFacultyAlldata.id,
        })
        .populate("faculty");
      console.log(newFacultyAlldata);
    }
    return newFacultyAlldata;
  });
exports.createFacultyService = createFacultyService;
// for admin
const createAdminService = (admin, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    let newUserAllData = null;
    if (!user.password) {
      user.password = config_1.default.default_student_password;
    }
    user.role = "admin";
    const session = yield mongoose_1.default.startSession();
    try {
      session.startTransaction();
      // create | generate id
      const id = yield (0, users_utils_1.generateAdminId)();
      user.id = id;
      admin.id = id;
      const createdAdmin = yield admin_model_1.default.create([admin], {
        session,
      });
      if (!createdAdmin.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          "Couldn't create admin"
        );
      }
      user.admin = createdAdmin[0]._id;
      // create user after creating the admin in admin collection
      const createdUser = yield users_model_1.default.create([user], {
        session,
      });
      if (!createdUser.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          "couldn't create user"
        );
      }
      newUserAllData = createdUser[0];
      yield session.commitTransaction();
      yield session.endSession();
    } catch (error) {
      yield session.abortTransaction();
      yield session.endSession();
      throw error;
    }
    if (newUserAllData) {
      newUserAllData = yield users_model_1.default
        .findOne({ id: newUserAllData.id })
        .populate({
          path: "admin",
          populate: [
            {
              path: "managementDepartment",
            },
          ],
        });
    }
    return newUserAllData;
  });
exports.createAdminService = createAdminService;
