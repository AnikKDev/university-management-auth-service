"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const student_constants_1 = require("./student.constants");
exports.studentSchema = new mongoose_1.Schema(
  {
    id: {
      type: String,
      required: [true, "Id is required"],
      unique: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        middleName: String,
        lastName: {
          type: String,
          required: true,
        },
      },
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: student_constants_1.gender,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-"],
    },
    email: {
      type: String,
      unique: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    guardian: {
      type: {
        fatherName: {
          type: String,
          required: true,
        },
        fatherContactNo: {
          type: String,
          required: true,
        },
        fatherOccupation: {
          type: String,
          required: true,
        },
        motherName: {
          type: String,
          required: true,
        },
        motherContactNo: {
          type: String,
          required: true,
        },
        motherOccupation: {
          type: String,
          required: true,
        },
      },
    },
    localGuardian: {
      type: {
        name: {
          type: String,
          required: true,
        },
        contactNo: {
          type: String,
          required: true,
        },
        occupation: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
      },
    },
    profileImg: {
      type: String,
      // required: true,
    },
    academicFaculty: {
      type: mongoose_1.default.Types.ObjectId,
      ref: "AcademicFaculty",
      required: true,
    },
    academicSemester: {
      type: mongoose_1.default.Types.ObjectId,
      ref: "AcademicSemester",
      required: true,
    },
    academicDepartment: {
      type: mongoose_1.default.Types.ObjectId,
      ref: "AcademicDepartment",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
const Students = mongoose_1.default.model("Students", exports.studentSchema);
exports.default = Students;