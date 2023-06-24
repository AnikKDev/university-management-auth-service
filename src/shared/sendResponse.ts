import { Response } from "express";
type IApiResponse<T> = {
  statusCode: number;
  message: string | null;
  success: boolean;
  data?: T | null;
};
export const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  const responseData: IApiResponse<T> = {
    statusCode: res.statusCode,
    success: data.success,
    message: data.message || null,
    data: data.data || null,
  };

  res.status(data.statusCode).send(responseData);
};
