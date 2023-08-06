"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.logger = void 0;
const path_1 = __importDefault(require("path"));
const winston_1 = __importStar(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(
  require("winston-daily-rotate-file")
);
const { combine, timestamp, label, printf } = winston_1.format;
// custom log formatting
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${date.toDateString()} ${hour}:${minute}:${second} [${label}] ${level}: ${message}`;
});
exports.logger = winston_1.default.createLogger({
  level: "info",
  format: combine(
    label({ label: "right meow!" }),
    timestamp(),
    myFormat
    // prettyPrint()
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston_1.default.transports.Console(),
    new winston_1.default.transports.File({
      level: "info",
      filename: path_1.default.join(
        process.cwd(),
        "logs",
        "winston",
        "successes",
        "uniManage-%DATE%-success.log"
      ),
    }),
    new winston_daily_rotate_file_1.default({
      filename: path_1.default.join(
        process.cwd(),
        "logs",
        "winston",
        "successes",
        "uniManage-%DATE%-success.log"
      ),
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});
exports.errorLogger = winston_1.default.createLogger({
  level: "error",
  format: combine(
    label({ label: "right meow!" }),
    timestamp(),
    myFormat
    // prettyPrint()
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston_1.default.transports.Console(),
    new winston_1.default.transports.File({
      level: "error",
      filename: path_1.default.join(
        process.cwd(),
        "logs",
        "winston",
        "errors",
        "uniManage-%DATE%-error.log"
      ),
    }),
    new winston_daily_rotate_file_1.default({
      filename: path_1.default.join(
        process.cwd(),
        "logs",
        "winston",
        "errors",
        "uniManage-%DATE%-error.log"
      ),
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});
