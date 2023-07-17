"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// for future usage
const userSchema = new mongoose_1.Schema({
    // custom made id (not from mongoose)
    id: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        // required: true,
    },
    student: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Students",
    },
    faculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        // ref: "AcademicFaculty",
        ref: "AcademicFacultyDetaileds",
    },
    admin: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Admin",
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// create model
const Users = (0, mongoose_1.model)("Users", userSchema);
exports.default = Users;
