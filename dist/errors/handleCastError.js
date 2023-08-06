"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
const handleCastError = err => {
  const errors = [
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
exports.handleCastError = handleCastError;
