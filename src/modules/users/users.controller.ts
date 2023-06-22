import { NextFunction, Request, Response } from "express";
import { createUserService } from "./users.service";

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req.body;
    const result = await createUserService(user);
    res.status(200).send({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (err) {
    // res.status(400).send({ success: false, message: "Failed to create user" });
    // sending the error to global error handler (globalErrorHandler) next function . as there is no middleware has been declared or called, it will automatically go to the global error handler
    next(err);
  }
};
