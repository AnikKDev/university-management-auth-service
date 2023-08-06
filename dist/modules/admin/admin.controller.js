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
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSingleAdminController =
  exports.updateSingleAdminController =
  exports.getSingleAdminController =
  exports.getAllAdminsController =
  exports.createAdminController =
    void 0;
const http_status_1 = __importStar(require("http-status"));
const pagination_constants_1 = require("../../constants/pagination.constants");
const catchAsync_1 = require("../../shared/catchAsync");
const pick_1 = require("../../shared/pick");
const sendResponse_1 = require("../../shared/sendResponse");
const users_service_1 = require("../users/users.service");
const admin_constants_1 = require("./admin.constants");
const admin_service_1 = require("./admin.service");
exports.createAdminController = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body,
      { admin } = _a,
      userData = __rest(_a, ["admin"]);
    const result = yield (0, users_service_1.createAdminService)(
      admin,
      userData
    );
    (0, sendResponse_1.sendResponse)(res, {
      message: "Create Admin",
      success: true,
      statusCode: http_status_1.OK,
      data: result,
    });
  })
);
exports.getAllAdminsController = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // to get the filters object based on the filterable admin array field
    const filters = (0, pick_1.pickQuery)(
      req.query,
      admin_constants_1.filterableAdmin
    );
    //  to get the pagination object (page, limit, sortOrder, sortBy, etc. based on the pagination queries)
    const paginationOptions = (0, pick_1.pickQuery)(
      req.query,
      pagination_constants_1.paginationQueries
    );
    // console.log(filters);
    // pass the both filters and pagination options to the service
    const result = yield (0, admin_service_1.getAllAdminsService)(
      filters,
      paginationOptions
    );
    // send the response
    (0, sendResponse_1.sendResponse)(res, {
      message: "Got all admins",
      success: true,
      data: result.data,
      statusCode: http_status_1.default.OK,
      meta: result.meta,
    });
  })
);
// get admin controller
exports.getSingleAdminController = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { adminId } = req.params;
    const result = yield (0, admin_service_1.getSingleAdminService)(adminId);
    (0, sendResponse_1.sendResponse)(res, {
      data: result,
      success: true,
      message: "admin details available",
      statusCode: http_status_1.default.OK,
    });
  })
);
// update admin controller
exports.updateSingleAdminController = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id, data } = req.body;
    const result = yield (0, admin_service_1.updateSingleAdminService)(
      id,
      data
    );
    (0, sendResponse_1.sendResponse)(res, {
      data: result,
      success: true,
      message: "admin updated sucessfully",
      statusCode: http_status_1.default.OK,
    });
  })
);
// delete admin controller
exports.deleteSingleAdminController = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, admin_service_1.deleteSingleAdminService)(id);
    (0, sendResponse_1.sendResponse)(res, {
      data: result,
      message: "admin deleted sucessfully",
      statusCode: http_status_1.default.OK,
      success: true,
    });
  })
);
