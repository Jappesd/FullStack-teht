// seedTestDataConnected.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import { User, Blog } from "../backend/connections/Schema.js"; // adjust path if needed

const MONGODB_URI = process.env.TEST_MONGODB;

const usersData = [
  { username: "alice", name: "Alice", password: "password123", isAdmin: true },
  { username: "bob", name: "Bob", password: "securepass", isAdmin: false },
  { username: "carol", name: "Carol", password: "mypassword", isAdmin: false },
];

const blogsData = [
  { title: "First Blog", url: "https://example.com/1", likes: 5 },
  { title: "Second Blog", url: "https://example.com/2", likes: 3 },
  { title: "Third Blog", url: "https://example.com/3", likes: 8 },
];

const seedTestDataConnected = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB Atlas!");

    const db = conn.connection.db;

    // Clear existing data
    await db.collection("blogs").deleteMany({});
    await db.collection("users").deleteMany({});
    console.log("Cleared old test data");

    // Insert users
    const insertedUsers = [];
    for (const u of usersData) {
      const passwordHash = await bcrypt.hash(u.password, 10);
      const res = await db.collection("users").insertOne({
        username: u.username,
        name: u.name,
        passwordHash,
        isAdmin: u.isAdmin,
        blogs: [],
      });
      insertedUsers.push({ ...u, _id: res.insertedId });
      console.log(`Created user: ${u.username}`);
    }

    // Insert blogs and link to users
    for (let i = 0; i < blogsData.length; i++) {
      const user = insertedUsers[i % insertedUsers.length];

      // Insert blog
      const blogRes = await db.collection("blogs").insertOne({
        ...blogsData[i],
        author: user.name,
        user: user._id,
      });

      // Add blog _id to user's blogs array
      await db
        .collection("users")
        .updateOne({ _id: user._id }, { $push: { blogs: blogRes.insertedId } });

      console.log(
        `Created blog: ${blogsData[i].title} for user ${user.username}`
      );
    }

    await mongoose.connection.close();
    console.log("All users and blogs seeded and connected successfully!");
  } catch (err) {
    console.error("Error seeding test data:", err);
    await mongoose.connection.close();
  }
};

seedTestDataConnected();
