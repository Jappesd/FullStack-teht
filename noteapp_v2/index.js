import app from "./app.js";
import logger from "./utils/logger.js";
import mongoose from "mongoose";
import path, { dirname } from "path";
import express from "express";
import { fileURLToPath } from "url";
import { configDotenv } from "dotenv";
const PORT = process.env.PORT || 3001;
configDotenv();
// 2. Connect DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    logger.info("Connected to mongoDB");
  })
  .catch((err) => logger.error("Error connecting to MongoDB", err.message));

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
