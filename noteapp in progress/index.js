import app from "./app.js";
import logger from "./utils/logger.js";
import mongoose from "mongoose";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "dist")));
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    logger.info("Connected to mongoDB");
    app.listen(process.env.PORT, () => {
      logger.info(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    logger.error("Error connecting to MongoDB", err.message);
  });

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
