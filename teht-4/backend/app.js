import express from "express";
import cors from "cors";
import usersRouter from "./Routers/users.js";
import blogsRouter from "./Routers/blogs.js";
import middleware from "./utils/middleware.js";

const app = express();
//Middleware
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

//Routes
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
// Unknown endpoints & error handling
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
