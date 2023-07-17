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
exports.updateAcademicFacultyController = exports.deleteAcademicFacultyController = exports.getAcademicFacultyController = exports.createAcademicFacultyController = exports.getAllAcademicFacultyController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_constants_1 = require("../../constants/pagination.constants");
const catchAsync_1 = require("../../shared/catchAsync");
const pick_1 = require("../../shared/pick");
const sendResponse_1 = require("../../shared/sendResponse");
const academicFaculty_service_1 = require("./academicFaculty.service");
exports.getAllAcademicFacultyController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.pickQuery)(req.query, pagination_constants_1.paginationQueries);
    const result = yield (0, academicFaculty_service_1.getAllAcademicFacultyService)(paginationOptions);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Got all academic faculties",
        data: result,
    });
}));
exports.createAcademicFacultyController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const academicFacultyData = __rest(req.body, []);
    const result = yield (0, academicFaculty_service_1.createAcademicFacultyService)(academicFacultyData);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Created academicFaculty successfully ",
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
    });
}));
exports.getAcademicFacultyController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, academicFaculty_service_1.getAcademicFacultyService)(req.body.id);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Got Academic Faculty successfully ",
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
    });
}));
exports.deleteAcademicFacultyController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, academicFaculty_service_1.deleteAcademicFacultyService)(req.body.id);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Deleted Academic Faculty successfully ",
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
    });
}));
exports.updateAcademicFacultyController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, academicFaculty_service_1.updateAcademicFacultyService)(req.body.id, req.body.data);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Updated Academic Faculty successfully ",
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
    });
}));
