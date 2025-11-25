// testUserInsert.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import { User } from "./testSchema.js"; // adjust path if needed

const MONGODB_URI = process.env.TEST_MONGODB;

const testInsert = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected!");

    console.log("User model:", User);
    console.log("Schema paths:", Object.keys(User.schema.paths));

    // minimal test user
    const passwordHash = await bcrypt.hash("testpass123", 10);
    const user = new User({
      username: "testuser",
      name: "Test User",
      passwordHash,
      isAdmin: true,
    });

    console.log("Saving user...");
    await user.save();
    console.log("User saved successfully!");

    await mongoose.connection.close();
  } catch (err) {
    console.error("Error:", err);
    await mongoose.connection.close();
  }
};

testInsert();
