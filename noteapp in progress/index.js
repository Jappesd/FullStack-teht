import app from "./app.js";
import logger from "./utils/logger.js";
import config from "./utils/config.js";
import { getConnection } from "./utils/connections.js";

const startServer = async () => {
  try {
    await getConnection(config.MONGO_user);

    logger.info("Connected to MongoDB");

    app.listen(config.PORT, () => {
      logger.info(`Server running on port ${config.PORT}`);
    });
  } catch (error) {
    logger.error("Error connecting to MongoDB", error.message);
  }
};

startServer();
