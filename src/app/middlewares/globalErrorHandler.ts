import { NextFunction, Request, Response } from "express";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import { handleValidationError } from "../../errors/handleValidationError";
import { IGenericErrorMessage } from "../../interfaces/error";
// global error handling
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(err);
  /* if (err instanceof Error) {
    res.status(400).send({ error: err });
  } else {
    res.status(500).send({ error: "Something went wrong" });
  } */

  let statusCode = 500;
  let message = "Something went wrong";
  let errorMessages: IGenericErrorMessage[] = [];
  if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: "",
            message: err?.message,
          },
        ]
      : [];
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: "",
            message: err?.message,
          },
        ]
      : [];
  }
  res.status(statusCode).send({
    success: false,
    message,
    errorMessages,
    stack: config.env === "production" ? undefined : err?.stack,
  });

  next();
};
export default globalErrorHandler;
