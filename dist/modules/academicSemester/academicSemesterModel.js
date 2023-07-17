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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const academicSemester_constant_1 = require("./academicSemester.constant");
// for future usage
const academicSemesterSchema = new mongoose_1.Schema({
    // custom made id (not from mongoose)
    title: {
        type: String,
        required: true,
        enum: academicSemester_constant_1.academicSemesterConstantTitle,
    },
    year: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        enum: academicSemester_constant_1.academicSemesterConstantCode,
    },
    startMonth: {
        type: String,
        required: true,
        enum: academicSemester_constant_1.academicSemesterConstantMonth,
    },
    endMonth: {
        type: String,
        required: true,
        enum: academicSemester_constant_1.academicSemesterConstantMonth,
    },
}, {
    timestamps: true,
});
//? 2025 autumm
//! 2025 autumn X
//? 2026 autumn
//? same year && same semester --> duplicate entry (it won't happen)
// ! handling same year and same semester issue
//  data --> check --> same year and same semester
// ! Pre hook
academicSemesterSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // checking with pre hook, before saving the data in database, that whether the data which is being saved from the instance of the schema. here, this refers to the current instance of the schema that is about to be saved in the database.
        const isExist = yield AcademicSemester.findOne({
            title: this.title,
            year: this.year,
        });
        if (isExist) {
            throw new ApiError_1.default(http_status_1.default.CONFLICT, "Semester already exists for the same year.");
        }
        next();
    });
});
// create model
const AcademicSemester = (0, mongoose_1.model)("AcademicSemester", academicSemesterSchema);
exports.default = AcademicSemester;
