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
exports.updateAcademicFacultyService =
  exports.deleteAcademicFacultyService =
  exports.getAcademicFacultyService =
  exports.createAcademicFacultyService =
  exports.getAllAcademicFacultyService =
    void 0;
const paginationHelpers_1 = require("../../helpers/paginationHelpers");
const academicFacultyModel_1 = __importDefault(
  require("./academicFacultyModel")
);
const getAllAcademicFacultyService = paginationOptions =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0,
    paginationHelpers_1.paginationHelper)(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }
    const result = yield academicFacultyModel_1.default
      .find({})
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
    const totalData = yield academicFacultyModel_1.default.countDocuments();
    return {
      meta: {
        page: page,
        limit: limit,
        totalData: totalData,
      },
      data: result,
    };
  });
exports.getAllAcademicFacultyService = getAllAcademicFacultyService;
const createAcademicFacultyService = data =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFacultyModel_1.default.create(data);
    return result;
  });
exports.createAcademicFacultyService = createAcademicFacultyService;
const getAcademicFacultyService = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFacultyModel_1.default.findById(id);
    return result;
  });
exports.getAcademicFacultyService = getAcademicFacultyService;
const deleteAcademicFacultyService = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFacultyModel_1.default.findByIdAndDelete(id);
    return result;
  });
exports.deleteAcademicFacultyService = deleteAcademicFacultyService;
const updateAcademicFacultyService = (id, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFacultyModel_1.default.findByIdAndUpdate(
      { _id: id },
      data,
      {
        new: true,
      }
    );
    return result;
  });
exports.updateAcademicFacultyService = updateAcademicFacultyService;
