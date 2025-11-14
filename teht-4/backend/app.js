import express from "express";
import cors from "cors";

import logger from "../utils/logger.js";
import blogsRouter from "./controllers/blogs.js";
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

export default app;
