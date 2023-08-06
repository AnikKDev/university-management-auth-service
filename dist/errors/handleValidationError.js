"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = err => {
  const errors = Object.values(err.errors).map(elem => {
    return {
      path: elem === null || elem === void 0 ? void 0 : elem.path,
      message: elem.message,
    };
  });
  const statusCode = 400;
  return {
    message: "Validation error",
    statusCode,
    errorMessages: errors,
  };
};
exports.handleValidationError = handleValidationError;
