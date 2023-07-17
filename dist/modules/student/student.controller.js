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
exports.deleteSingleStudentController = exports.updateSingleStudentController = exports.getSingleStudentController = exports.getAllStudentController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_constants_1 = require("../../constants/pagination.constants");
const catchAsync_1 = require("../../shared/catchAsync");
const pick_1 = require("../../shared/pick");
const sendResponse_1 = require("../../shared/sendResponse");
const student_constants_1 = require("./student.constants");
const student_service_1 = require("./student.service");
// get Students
exports.getAllStudentController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // for search filter
    const filters = (0, pick_1.pickQuery)(req.query, student_constants_1.filterableStudent);
    // obj for holding pagination filters
    const paginationOptions = (0, pick_1.pickQuery)(req.query, pagination_constants_1.paginationQueries);
    // console.log(paginationOptions);
    const result = yield (0, student_service_1.getAllStudentsService)(paginationOptions, filters);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Got all the Students",
        meta: result.meta,
        data: result.data,
    });
}));
exports.getSingleStudentController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, student_service_1.getSingleStudentService)(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Got semester data",
        data: result,
    });
}));
// get single Student
exports.updateSingleStudentController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedData = __rest(req.body, []);
    const result = yield (0, student_service_1.updateSingleStudentService)(id, updatedData);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "updated Student data",
        data: result,
    });
}));
exports.deleteSingleStudentController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //
    const result = yield (0, student_service_1.deleteSingleStudentService)(req.body.id);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Student deleted successfully",
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
    });
}));
