// Load dotenv safely with absolute path
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { test, describe, before, after, beforeEach } from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../app.js";
import { Blog } from "../connections/Schema.js";

// fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../../");
// explicitly load .env from project root
dotenv.config({ path: path.resolve(projectRoot, ".env") });
console.log("Loaded MONGOURL", process.env.MONGOURL);
// Connect to MongoDB before any tests
before(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGOURL);
    console.log("Connected to MongoDB for tests");
  }
});

// Close MongoDB after all tests
after(async () => {
  await mongoose.connection.close();
  console.log("Closed MongoDB connection after tests");
});

// Reset database before each test
beforeEach(async () => {
  await Blog.deleteMany({}); // clear all blogs

  const initialBlogs = [
    {
      title: "First blog",
      author: "Alice",
      url: "http://example.com/1",
      likes: 5,
    },
    {
      title: "Second blog",
      author: "Bob",
      url: "http://example.com/2",
      likes: 10,
    },
  ];

  await Blog.insertMany(initialBlogs);
});

describe("Blog API", () => {
  test("GET /api/blogs returns JSON", async () => {
    await request(app)
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /json/);
  });

  test("POST /api/blogs creates a new blog", async () => {
    const newBlog = {
      title: "Supertest blog",
      author: "Sam",
      url: "http://example.com/supertest",
      likes: 7,
    };

    const response = await request(app)
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /json/);

    // Check response
    assert.strictEqual(response.body.title, newBlog.title);
    assert.strictEqual(response.body.author, newBlog.author);
    assert.strictEqual(response.body.url, newBlog.url);
    assert.strictEqual(response.body.likes, newBlog.likes);

    // Check DB has 3 blogs now
    const blogsInDb = await Blog.find({});
    assert.strictEqual(blogsInDb.length, 3);
  });
});
