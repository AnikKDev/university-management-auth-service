import dotenv from "dotenv";
import path from "path";
// configuring current project directory with dotenv configuration
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URI,
  default_student_password: process.env.DEFAULT_STUDENT_PASSWORD,
};
