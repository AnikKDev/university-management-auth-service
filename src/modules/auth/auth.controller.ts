import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";

export const loginUserController = catchAsync(
  async (req: Request, res: Response) => {
    console.log(req.body);
  }
);
