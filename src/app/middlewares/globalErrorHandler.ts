/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import { handleCastError } from "../../errors/handleCastError";
import { handleValidationError } from "../../errors/handleValidationError";
import { handleZodError } from "../../errors/handleZodError";
import { IGenericErrorMessage } from "../../interfaces/error";
import { errorLogger } from "../../shared/logger";
// global error handling
const globalErrorHandler: ErrorRequestHandler = (
  /* err: any,
  req: Request,
  res: Response,
  next: NextFunction */
  err,
  req,
  res,
  next
) => {
  // console.log(err);
  /* if (err instanceof Error) {
    res.status(400).send({ error: err });
  } else {
    res.status(500).send({ error: "Something went wrong" });
  } */
  config.env === "development"
    ? console.log(`error from ${config.env}. ${err}`)
    : errorLogger.error(`From ${config.env}. ${err}`);

  let statusCode = 500;
  let message = "Something went wrong";
  let errorMessages: IGenericErrorMessage[] = [];
  if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
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
