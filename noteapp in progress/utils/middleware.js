import logger from "./logger.js";

// logs every request
const requestLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  if (req.method === "POST" || req.method === "PUT") {
    logger.info("Body:", req.body);
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
  next(error);
};

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
