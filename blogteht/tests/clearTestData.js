// clearTestDataRaw.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.TEST_MONGODB;

const clearTestDataRaw = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB Atlas!");

    const db = conn.connection.db;

    const userResult = await db.collection("users").deleteMany({});
    const blogResult = await db.collection("blogs").deleteMany({});

    console.log(`Deleted ${userResult.deletedCount} users`);
    console.log(`Deleted ${blogResult.deletedCount} blogs`);

    await mongoose.connection.close();
    console.log("Database cleaned successfully!");
  } catch (err) {
    console.error("Error clearing database:", err);
    await mongoose.connection.close();
  }
};

clearTestDataRaw();
