import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import { errorLogger, logger } from "./shared/logger";
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info("Connected to MongoDB");
    // listening default port
    app.listen(config.port, () => {
      // console.log(`Connected to port ${config.port}`);
      logger.info(`Connected to port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error("Failed to connect to MongoDB", err);
  }
}
// calling the main function
main();
