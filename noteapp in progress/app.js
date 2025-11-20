import express from "express";
import cors from "cors";
import noteRouter from "./controllers/notesRouter.js";
import {
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
  errorHandler,
} from "./utils/middleware.js";
import userRouter from "./controllers/userRouter.js";
import loginRouter from "./controllers/login.js";

const app = express();
//middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(tokenExtractor);
//routes
app.use("/api/notes", noteRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
//unknown endpoints and error handler
app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
