// createTestUsersAndBlogs.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import { User, Blog } from "../backend/connections/Schema.js"; // make sure path is correct

const MONGODB_URI = process.env.TEST_MONGODB;

const users = [
  { username: "alice", name: "Alice", password: "password123", isAdmin: true },
  { username: "bob", name: "Bob", password: "securepass", isAdmin: false },
  { username: "carol", name: "Carol", password: "mypassword", isAdmin: false },
];

const blogs = [
  { title: "First Blog", url: "https://example.com/1", likes: 5 },
  { title: "Second Blog", url: "https://example.com/2", likes: 3 },
  { title: "Third Blog", url: "https://example.com/3", likes: 8 },
];

const createUsersAndBlogs = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB Atlas!");

    const insertedUsers = [];

    // Create users sequentially
    for (const u of users) {
      const passwordHash = await bcrypt.hash(u.password, 10);
      const user = new User({ ...u, passwordHash });
      const savedUser = await user.save();
      insertedUsers.push(savedUser);
      console.log(`Created user: ${savedUser.username}`);
    }

    // Create blogs and link to user _id
    for (let i = 0; i < blogs.length; i++) {
      const user = insertedUsers[i % insertedUsers.length];
      const blog = new Blog({
        ...blogs[i],
        author: user.name,
        user: user._id,
      });
      const savedBlog = await blog.save();
      console.log(`Created blog: ${savedBlog.title} for user ${user.username}`);
    }

    console.log("All users and blogs created successfully!");
    await mongoose.connection.close();
  } catch (err) {
    console.error("Error creating users/blogs:", err);
    await mongoose.connection.close();
  }
};

createUsersAndBlogs();
