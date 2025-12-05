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
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
// 3. Catch-all route *AFTER* static + API
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  } else {
    next();
  }
});

//unknown endpoints and error handler
app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
