import app from "./app.js";
import logger from "./utils/logger.js";
import mongoose from "mongoose";
import path from "path";
import express from "express";
const __dirname = path.resolve();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    logger.info("Connected to mongoDB");
    try {
      app.use(express.static(path.join(__dirname, "dist")));
      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "dist", "index.html"));
      });
    } catch (err) {
      logger.error("Static file serving error:", err);
    }

    app.listen(process.env.PORT, () => {
      logger.info(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    logger.error("Error connecting to MongoDB", err.message);
  });
