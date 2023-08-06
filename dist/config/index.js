"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// configuring current project directory with dotenv configuration
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
  env: process.env.NODE_DEV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URI,
  default_student_password: process.env.DEFAULT_STUDENT_PASSWORD,
};
