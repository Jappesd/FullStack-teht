import express from "express";
import cors from "cors";
import noteRouter from "./controllers/notesRouter.js";
import middleware from "./utils/middleware.js";
import userRouter from "./controllers/userRouter.js";
const app = express();
//middleware
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

//routes
app.use("/api/notes", noteRouter);
app.use("/api/users", userRouter);

//unknown endpoints and error handler
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
