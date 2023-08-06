import dotenv from "dotenv";
import path from "path";
// configuring current project directory with dotenv configuration
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_DEV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URI,
  default_student_password: process.env.DEFAULT_STUDENT_PASSWORD,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_token: process.env.JWT_REFRESH_SECRET,
    jwt_expiry: process.env.JWT_EXPIRY,
    jwt_expiry_refresh: process.env.JWT_EXPIRY_REFRESH_SECRET,
  },
};
