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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSingleStudentService =
  exports.updateSingleStudentService =
  exports.getSingleStudentService =
  exports.getAllStudentsService =
    void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const paginationHelpers_1 = require("../../helpers/paginationHelpers");
const student_constants_1 = require("./student.constants");
const student_model_1 = __importDefault(require("./student.model"));
const getAllStudentsService = (paginationOptions, filters) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters,
      filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
      andConditions.push({
        $or: student_constants_1.searchableStudent.map(field => ({
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
    const { page, limit, skip, sortBy, sortOrder } = (0,
    paginationHelpers_1.paginationHelper)(paginationOptions);
    const sortConditions = {};
    if (sortOrder && sortBy) {
      sortConditions[sortBy] = sortOrder;
    }
    // where condition --> jodi and condition thake tahole eta, othoba empty object
    const whereCondition = andConditions.length ? { $and: andConditions } : {};
    const result = yield student_model_1.default
      .find(whereCondition)
      .populate("academicSemester")
      .populate("academicFaculty")
      .populate("academicDepartment")
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
    const totalData = yield student_model_1.default.countDocuments(result);
    return {
      meta: {
        page: page,
        limit: limit,
        totalData: totalData,
      },
      data: result,
    };
  });
exports.getAllStudentsService = getAllStudentsService;
// for single semester
const getSingleStudentService = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.default.findById(id);
    return result;
  });
exports.getSingleStudentService = getSingleStudentService;
// for updating a single semester
const updateSingleStudentService = (id, updatedData) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // check whether the data exists
    const isExist = yield student_model_1.default.findById(id);
    if (!isExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        "The student that you are trying to update is not found"
      );
    }
    const { name, guardian, localGuardian } = updatedData,
      studentData = __rest(updatedData, ["name", "guardian", "localGuardian"]);
    const updatedStudentData = Object.assign({}, studentData);
    // handle updating the specified data dynamically
    if (name && Object.keys(name).length > 0) {
      Object.keys(name).forEach(key => {
        const nameKey = `name.${key}`;
        updatedStudentData[nameKey] = name[key];
      });
    }
    if (guardian && Object.keys(guardian).length > 0) {
      Object.keys(guardian).forEach(key => {
        const guardianKey = `guardian.${key}`;
        updatedStudentData[guardianKey] = guardian[key];
      });
    }
    if (localGuardian && Object.keys(localGuardian).length > 0) {
      Object.keys(localGuardian).forEach(key => {
        const localGuardianKey = `localGuardian.${key}`;
        updatedStudentData[localGuardianKey] = localGuardian[key];
      });
    }
    const result = yield student_model_1.default.findOneAndUpdate(
      { _id: id },
      updatedStudentData,
      {
        new: true,
      }
    );
    return result;
  });
exports.updateSingleStudentService = updateSingleStudentService;
// delete single semester
const deleteSingleStudentService = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.default.findByIdAndDelete(id);
    return result;
  });
exports.deleteSingleStudentService = deleteSingleStudentService;
