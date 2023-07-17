"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schema.parseAsync({
            body: req === null || req === void 0 ? void 0 : req.body,
            query: req === null || req === void 0 ? void 0 : req.query,
            params: req === null || req === void 0 ? void 0 : req.params,
            cookies: req === null || req === void 0 ? void 0 : req.cookies,
        });
        return next();
    }
    catch (err) {
        // res.status(400).json({ success: false, message: "Failed to create user" });
        // sending the error to global error handler (globalErrorHandler) next function . as there is no middleware has been declared or called, it will automatically go to the global error handler
        next(err);
    }
});
exports.validateRequest = validateRequest;
