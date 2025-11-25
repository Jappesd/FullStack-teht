import logger from "./logger.js";
import jwt from "jsonwebtoken";
// logs every request
const requestLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  if (req.method === "POST" || req.method === "PUT") {
    logger.info("Body:", req.body);
  }
  next();
};

//Token extractor
const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  } else {
    req.token = null;
  }
  next();
};
//User extractor
const userExtractor = (req, res, next) => {
  if (req.token) {
    try {
      const decodedToken = jwt.verify(req.token, process.env.SECRET);
      req.user = decodedToken; // contains username and id
    } catch (err) {
      req.user = null;
      return res.status(401).json({ error: "token invalid or expired" });
    }
  }
  next();
};

//handles requests to unknown endpoints
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

//handles errors
const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === "CastError" && error.kind === "ObjectId") {
    return res.status(400).send({ error: "malformatted id" });
  }
  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  //duplicate key error (unique username)
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    return res.status(400).json({
      error: `${field} must be unique`,
    });
  }
  next(error);
};

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
