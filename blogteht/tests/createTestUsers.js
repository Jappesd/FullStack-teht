// createTestUsers.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import { User, Blog } from "../backend/connections/Schema.js"; // make sure the path is correct

const MONGODB_URI = process.env.TEST_MONGODB;

const users = [
  { username: "alice", name: "Alice", password: "password123", isAdmin: true },
  { username: "bob", name: "Bob", password: "securepass", isAdmin: false },
  { username: "carol", name: "Carol", password: "mypassword", isAdmin: false },
];

const createUsers = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB Atlas!");

    for (const u of users) {
      const passwordHash = await bcrypt.hash(u.password, 10);

      const user = new User({
        username: u.username,
        name: u.name,
        passwordHash,
        isAdmin: u.isAdmin,
      });

      await user.save();
      console.log(`Created user: ${u.username}`);
    }

    console.log("All users created successfully.");
    await mongoose.connection.close();
  } catch (err) {
    console.error("Error creating users:", err);
    await mongoose.connection.close();
  }
};

createUsers();
