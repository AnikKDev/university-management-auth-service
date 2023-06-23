import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
export const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req?.body,
        query: req?.query,
        params: req?.params,
        cookies: req?.cookies,
      });
      return next();
    } catch (err) {
      // res.status(400).send({ success: false, message: "Failed to create user" });
      // sending the error to global error handler (globalErrorHandler) next function . as there is no middleware has been declared or called, it will automatically go to the global error handler
      next(err);
    }
  };