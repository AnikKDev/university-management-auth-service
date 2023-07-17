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
exports.deleteSingleAdminService = exports.updateSingleAdminService = exports.getSingleAdminService = exports.getAllAdminsService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const paginationHelpers_1 = require("../../helpers/paginationHelpers");
const admin_constants_1 = require("./admin.constants");
const admin_model_1 = __importDefault(require("./admin.model"));
const getAllAdminsService = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    //   console.log(filters);
    if (searchTerm) {
        andConditions.push({
            $or: admin_constants_1.searchableAdmin.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
        /*
        {
      $or: [
        { username: { $regex: 'John', $options: 'i' } },
        { email: { $regex: 'John', $options: 'i' } },
      ]
    }
        */
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // pagination filters
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelpers_1.paginationHelper)(paginationOptions);
    const sortConditions = {};
    if (sortOrder && sortBy) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereCondition = andConditions.length
        ? {
            $and: andConditions,
        }
        : {};
    const result = yield admin_model_1.default.find(whereCondition)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate("managementDepartment");
    const totalData = yield admin_model_1.default.countDocuments(whereCondition);
    return {
        meta: {
            page: page,
            limit: limit,
            totalData: totalData,
        },
        data: result,
    };
});
exports.getAllAdminsService = getAllAdminsService;
// get single admin
const getSingleAdminService = (adminId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.default.findById(adminId).populate("managementDepartment");
    return result;
});
exports.getSingleAdminService = getSingleAdminService;
// update single admin
const updateSingleAdminService = (adminId, data) => __awaiter(void 0, void 0, void 0, function* () {
    // check if exists
    const isExist = yield admin_model_1.default.findById(adminId).lean();
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Admin not found");
    }
    const { name } = data, adminData = __rest(data, ["name"]);
    const updatedAdminData = Object.assign({}, adminData);
    if (name && Object.keys(name).length) {
        Object.keys(name).forEach(item => {
            const nameKey = `name.${item}`;
            updatedAdminData[nameKey] = name[item];
        });
    }
    const result = yield admin_model_1.default.findOneAndUpdate({ _id: adminId }, data, {
        new: true,
    });
    return result;
});
exports.updateSingleAdminService = updateSingleAdminService;
// delete service
const deleteSingleAdminService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield admin_model_1.default.findById(id).lean();
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Admin can not be found");
    }
    const result = yield admin_model_1.default.findOneAndDelete({ _id: id });
    return result;
});
exports.deleteSingleAdminService = deleteSingleAdminService;
