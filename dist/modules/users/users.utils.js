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
exports.generateAdminId = exports.generateFacultyId = exports.findLastFacultyId = exports.generateStudentId = exports.findLastStudentId = void 0;
const users_model_1 = __importDefault(require("./users.model"));
const findLastStudentId = () => __awaiter(void 0, void 0, void 0, function* () {
    // get users in descending order based on creation and then lean them to get the data not as a document but as a clean object
    const lastStudent = yield users_model_1.default.findOne({ role: "student" }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id) ? lastStudent.id.substring(4) : undefined;
});
exports.findLastStudentId = findLastStudentId;
const generateStudentId = (academicSemester) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUserId = (yield (0, exports.findLastStudentId)()) || String(0).padStart(5, "0");
    let incrementedId = (parseInt(currentUserId) + 1).toString().padStart(5, "0");
    // 2025 --> 25
    incrementedId = `${academicSemester === null || academicSemester === void 0 ? void 0 : academicSemester.year.substring(2)}${academicSemester === null || academicSemester === void 0 ? void 0 : academicSemester.code}${incrementedId}`;
    // console.log(incrementedId);
    return incrementedId;
    //   return String(lastUserId).padStart(5, "0");
});
exports.generateStudentId = generateStudentId;
const findLastFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastFaculty = yield users_model_1.default.findOne({ role: "faculty" }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastFaculty === null || lastFaculty === void 0 ? void 0 : lastFaculty.id) ? lastFaculty === null || lastFaculty === void 0 ? void 0 : lastFaculty.id.substring(2) : undefined;
});
exports.findLastFacultyId = findLastFacultyId;
const generateFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentFacultyId = (yield (0, exports.findLastFacultyId)()) || (0).toString().padStart(5, "0");
    let incrementedFacultyId = (parseInt(currentFacultyId) + 1)
        .toString()
        .padStart(5, "0");
    incrementedFacultyId = `F-${incrementedFacultyId}`;
    return incrementedFacultyId;
});
exports.generateFacultyId = generateFacultyId;
const findLastAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastAdminId = yield users_model_1.default.findOne({ role: "admin" }, { _id: 0, id: 1 })
        .sort({ createdAt: -1 })
        .lean();
    return (lastAdminId === null || lastAdminId === void 0 ? void 0 : lastAdminId.id) ? lastAdminId === null || lastAdminId === void 0 ? void 0 : lastAdminId.id.substring(2) : undefined;
});
const generateAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentAdminId = (yield findLastAdminId()) || (0).toString().padStart(5, "0");
    let incrementedAdminId = (parseInt(currentAdminId) + 1)
        .toString()
        .padStart(5, "0");
    incrementedAdminId = `A-${incrementedAdminId}`;
    return incrementedAdminId;
});
exports.generateAdminId = generateAdminId;
