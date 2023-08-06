"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const academicDepartment_router_1 = __importDefault(
  require("../../modules/academicDepartment/academicDepartment.router")
);
const academicFaculty_router_1 = __importDefault(
  require("../../modules/academicFaculty/academicFaculty.router")
);
const academicSemester_router_1 = __importDefault(
  require("../../modules/academicSemester/academicSemester.router")
);
const admin_router_1 = __importDefault(
  require("../../modules/admin/admin.router")
);
const managementDepartment_router_1 = __importDefault(
  require("../../modules/managementDepartment/managementDepartment.router")
);
const student_router_1 = __importDefault(
  require("../../modules/student/student.router")
);
const users_router_1 = __importDefault(
  require("../../modules/users/users.router")
);
const router = (0, express_1.Router)();
//
const moduleRoutes = [
  { path: "/users", router: users_router_1.default },
  { path: "/academic-semester", router: academicSemester_router_1.default },
  { path: "/academic-faculty", router: academicFaculty_router_1.default },
  { path: "/academic-department", router: academicDepartment_router_1.default },
  { path: "/students", router: student_router_1.default },
  {
    path: "/management-departments",
    router: managementDepartment_router_1.default,
  },
  { path: "/admins", router: admin_router_1.default },
];
/* router.use("/users", userRouter);
router.use("/academic-semester", academicSemesterRouter); */
moduleRoutes.forEach(route => router.use(route.path, route.router));
exports.default = router;
