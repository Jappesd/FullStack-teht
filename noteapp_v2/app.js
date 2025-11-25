import express from "express";
import cors from "cors";
import noteRouter from "./controllers/notesRouter.js";
import {
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
  errorHandler,
  userExtractor,
} from "./utils/middleware.js";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./controllers/userRouter.js";
import loginRouter from "./controllers/login.js";

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(tokenExtractor);
// 1. Serve static frontend
app.use(express.static(path.join(__dirname, "dist")));
//routes
app.use("/api/notes", noteRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
//unknown endpoints and error handler
app.use(unknownEndpoint);
app.use(errorHandler);
// 3. Catch-all route *AFTER* static + API
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

export default app;
