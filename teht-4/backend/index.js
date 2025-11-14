import app from "./app.js";
import logger from "../utils/logger.js";
import config from "../utils/config.js";
import mongoose from "mongoose";
// Start server
mongoose
  .connect(config.MONGOURL)
  .then(() => {
    logger.info("Connected to MongoDB");
    app.listen(config.PORT, () => {
      logger.info(`Server running on port ${config.PORT}`);
    });
  })
  .catch((err) => {
    logger.error("Error connecting to MongoDB", err.message);
  });
