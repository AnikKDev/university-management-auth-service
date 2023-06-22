import path from "path";
import winston, { format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
const { combine, timestamp, label, printf } = format;
// custom log formatting
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${date.toDateString()} ${hour}:${minute}:${second} [${label}] ${level}: ${message}`;
});
export const logger = winston.createLogger({
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
    new winston.transports.Console(),
    new winston.transports.File({
      level: "info",
      filename: path.join(
        process.cwd(),
        "logs",
        "winston",
        "successes",
        "uniManage-%DATE%-success.log"
      ),
    }),
    new DailyRotateFile({
      filename: path.join(
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
export const errorLogger = winston.createLogger({
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
    new winston.transports.Console(),
    new winston.transports.File({
      level: "error",
      filename: path.join(
        process.cwd(),
        "logs",
        "winston",
        "errors",
        "uniManage-%DATE%-error.log"
      ),
    }),
    new DailyRotateFile({
      filename: path.join(
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
