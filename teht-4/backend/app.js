import express from "express";
import cors from "cors";
import config from "../utils/config.js";
import logger from "../utils/logger.js";
import blogsRouter from "./controllers/blogs";
import middleware from "../utils/middleware.js";
const app = express();
//Middleware
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

//Routes
app.use("/api/blogs", blogsRouter);

// Unknown endpoints & error handling
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

//Connect to mongodb
mongoose
  .connect(config.MONGOURL)
  .then(() => logger.info("Connected to MongoDB"))
  .catch((err) => logger.error("Error connecting to MongoDB: ", err.message));

export default app;
