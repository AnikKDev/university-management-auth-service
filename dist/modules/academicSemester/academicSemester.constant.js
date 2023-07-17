"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterableAcademicSemester = exports.searchableAcademicSemester = exports.academicSemesterTitleCodeMapper = exports.academicSemesterConstantCode = exports.academicSemesterConstantTitle = exports.academicSemesterConstantMonth = void 0;
exports.academicSemesterConstantMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
exports.academicSemesterConstantTitle = [
    "autumn",
    "summar",
    "fall",
];
exports.academicSemesterConstantCode = [
    "01",
    "02",
    "03",
];
exports.academicSemesterTitleCodeMapper = {
    autumn: "01",
    summar: "02",
    fall: "03",
};
exports.searchableAcademicSemester = ["title", "code", "year"];
exports.filterableAcademicSemester = [
    "searchTerm",
    "title",
    "code",
    "year",
];
