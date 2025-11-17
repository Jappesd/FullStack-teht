import mongoose from "mongoose";
import config from "./config.js";

export const userConnection = await mongoose.createConnection(
  config.MONGO_user
);
export const noteConnection = await mongoose.createConnection(config.MONGODB);

userConnection.on("connected", () => console.log("Connected to user DB"));
noteConnection.on("connected", () => console.log("Connected to note DB"));
