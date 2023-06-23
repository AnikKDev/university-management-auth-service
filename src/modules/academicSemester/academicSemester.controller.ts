import { RequestHandler } from "express";
import { createAcademicSemesterService } from "./academicSemester.service";

export const createAcademicSemesterController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { ...academicSemesterData } = req.body;
    const result = await createAcademicSemesterService(academicSemesterData);
    res.status(200).json({
      success: true,
      message: "Semester created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
