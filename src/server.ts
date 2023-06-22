import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import { errorLogger, logger } from "./shared/logger";
// handling uncaught exceptions
process.on("uncaughtException", err => {
  errorLogger.error(err);
  process.exit(1);
});
let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info("Connected to MongoDB");
    // listening default port
    server = app.listen(config.port, () => {
      // console.log(`Connected to port ${config.port}`);
      logger.info(`Connected to port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error("Failed to connect to MongoDB", err);
  }

  // listening event (event driven)
  process.on("unhandledRejection", err => {
    errorLogger.error(err);
    if (server) {
      server.close(err => {
        errorLogger.error(err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
// calling the main function
main();

// siggterm
process.on("SIGTERM", () => {
  logger.info("SIGTERM (signal termination) is received");
  if (server) {
    server.close();
  }
});
