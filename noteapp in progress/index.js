import app from "./app.js";
import logger from "./utils/logger.js";
import config from "./utils/config.js";
import mongoose from "mongoose";
//start server
mongoose
  .connect(config.MONGODB)
  .then(() => {
    logger.info("Connected to Mongo");
    app.listen(config.PORT, () => {
      logger.info(`Server running on port ${config.PORT}`);
    });
  })
  .catch((err) => {
    logger.error("Error connecting to MongoDB", logger.error(err.message));
  });
