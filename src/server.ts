import mongoose from "mongoose";
import app from "./app";
import config from "./config";
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Connected to MongoDB");
    // listening default port
    app.listen(config.port, () => {
      console.log(`Connected to port ${config.port}`);
    });
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
}
// calling the main function
main();
