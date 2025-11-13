import express from "express";
import cors from "cors";
import config from "../utils/config.js";
import logger from "../utils/logger.js";
import blogsRouter from "./controllers/blogs";
import middleware from "../utils/middleware.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

export default app;
