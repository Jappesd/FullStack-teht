import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { User } from "../backend/connections/Schema.js";

const MONGODB_URI = process.env.TEST_MONGODB;

const test = async () => {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected!");

  console.log("User model:", User); // should show a function
  const u = new User({ username: "test", name: "Test", passwordHash: "abc" });
  await u.save();
  console.log("Saved!");
  await mongoose.connection.close();
};

test();
