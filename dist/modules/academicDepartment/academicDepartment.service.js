"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSingleDepartmentService = exports.updateSingleDepartmentService = exports.getSingleDepartmentService = exports.getAllAcademicDepartmentService = exports.createAcademicDepartmentService = void 0;
const paginationHelpers_1 = require("../../helpers/paginationHelpers");
const academicDepartment_constant_1 = require("./academicDepartment.constant");
const academicDepartmentModel_1 = __importDefault(require("./academicDepartmentModel"));
const createAcademicDepartmentService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartmentModel_1.default.create(data);
    return result;
});
exports.createAcademicDepartmentService = createAcademicDepartmentService;
const getAllAcademicDepartmentService = (paginationOptions, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: academicDepartment_constant_1.searchableAcademicDepartment.map(field => ({
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
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelpers_1.paginationHelper)(paginationOptions);
    const sortConditions = {};
    if (sortOrder && sortBy) {
        sortConditions[sortBy] = sortOrder;
    }
    // where condition --> jodi and condition thake tahole eta, othoba empty object
    const whereCondition = andConditions.length ? { $and: andConditions } : {};
    const result = yield academicDepartmentModel_1.default.find(whereCondition)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate("academicFacultyId");
    const totalData = yield academicDepartmentModel_1.default.countDocuments();
    return {
        meta: {
            page: page,
            limit: limit,
            totalData: totalData,
        },
        data: result,
    };
});
exports.getAllAcademicDepartmentService = getAllAcademicDepartmentService;
// for single semester
const getSingleDepartmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartmentModel_1.default.findById(id);
    return result;
});
exports.getSingleDepartmentService = getSingleDepartmentService;
// for updating a single semester
const updateSingleDepartmentService = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartmentModel_1.default.findOneAndUpdate({ _id: id }, updatedData, {
        new: true,
    });
    return result;
});
exports.updateSingleDepartmentService = updateSingleDepartmentService;
//? ensure 1 : Route level --> If you want to update title or code either one of them, you have to give both
//? ensure 2 : Service level --> mapping title with code
// delete single semester
const deleteSingleDepartmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartmentModel_1.default.findByIdAndDelete(id);
    return result;
});
exports.deleteSingleDepartmentService = deleteSingleDepartmentService;
