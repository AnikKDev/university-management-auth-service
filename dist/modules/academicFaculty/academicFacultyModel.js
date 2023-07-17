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
const academicFacultySchema = new mongoose_1.Schema({
    title: {
        type: "string",
        required: [true, "Please provide a faculty title"],
    },
});
// check whether the faculty already exists or not
academicFacultySchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isFacultyExist = yield AcademicFaculty.findOne({ title: this.title });
        if (isFacultyExist) {
            throw new ApiError_1.default(http_status_1.default.CONFLICT, "Faculty already exists");
        }
        else {
            next();
        }
    });
});
const AcademicFaculty = (0, mongoose_1.model)("AcademicFaculty", academicFacultySchema);
exports.default = AcademicFaculty;
