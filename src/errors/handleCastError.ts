import mongoose from "mongoose";
import { IGenericErrorMessage } from "../interfaces/error";

export const handleCastError = (err: mongoose.CastError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: err.path,
      message: "Invalid Id",
    },
  ];
  const statusCode = 400;
  return {
    message: "Mongoose Cast Error",
    statusCode,
    errorMessages: errors,
  };
};
