import mongoose from "mongoose";
import { IGenericErrorResponse } from "../interfaces/common";
import { IGenericErrorMessage } from "../interfaces/error";

export const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (elem: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: elem?.path,
        message: elem.message,
      };
    }
  );
  const statusCode = 400;

  return {
    message: "Validation error",
    statusCode,
    errorMessages: errors,
  };
};
