import { SortOrder } from "mongoose";

type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};
// return type
type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};
export const paginationHelper = (options: IOptions): IOptionsResult => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  // skip value formula
  const skip = (page - 1) * limit;
  //   sorting
  const sortBy = options.sortBy ? options.sortBy : "createdAt";
  const sortOrder = options.sortOrder ? options.sortOrder : "desc";
  return { page, limit, skip, sortBy, sortOrder };
};
