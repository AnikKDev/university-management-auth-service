"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelper = void 0;
const paginationHelper = (options) => {
    const page = Number(options.page || 1);
    const limit = Number(options.limit || 10);
    // skip value formula
    const skip = (page - 1) * limit;
    //   sorting
    const sortBy = options.sortBy ? options.sortBy : "createdAt";
    const sortOrder = options.sortOrder ? options.sortOrder : "desc";
    return { page, limit, skip, sortBy, sortOrder };
};
exports.paginationHelper = paginationHelper;
