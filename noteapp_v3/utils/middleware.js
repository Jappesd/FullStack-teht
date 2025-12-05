import logger from "./logger.js";
import jwt from "jsonwebtoken";
import User from "../models/users.js";

// logs every request
export const requestLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  if (req.method === "POST" || req.method === "PUT") {
    logger.info("Body:", req.body);
  }
  next();
};

// Token extractor middleware
export const tokenExtractor = (req, res, next) => {
  const auth = req.get("authorization");
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    req.token = auth.substring(7);
  } else {
    req.token = null;
  }
  next();
};

// User extractor middleware
export const userExtractor = async (req, res, next) => {
  const token = req.token;

  if (!token) {
    return res.status(401).json({ error: "token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    if (!decoded.id) {
      return res.status(401).json({ error: "token invalid" });
    }

    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({ error: "user not found" });
    }

    next();
  } catch (error) {
    next(error);
  }
};

// Handles requests to unknown endpoints
export const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

// Handles errors
export const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === "CastError" && error.kind === "ObjectId") {
    return res.status(400).send({ error: "malformatted id" });
  }
  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return res.status(400).json({ error: "expected `username` to be unique" });
  }
  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Token invalid" });
  }
  if (error.name === "TokenExpiredError") {
    return res.status(401).json({
      error: "token expired",
    });
  }
  next(error);
};
