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
// const projectRoot = path.resolve(__dirname, "../..");
// const envPath = path.join(projectRoot, ".env");
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
// Connect to MongoDB before any tests
const api = request(app);
before(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB for tests");
  }
});
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
// Close MongoDB after all tests
after(async () => {
  await mongoose.connection.close();
  console.log("Closed MongoDB connection after tests");
});

// Reset database before each test
beforeEach(async () => {
  await Blog.deleteMany({}); // clear all blogs

  await Blog.insertMany(initialBlogs);
});
describe("GET /api/blogs", () => {
  test("returns blogs as json", async () => {
    const res = await api.get("/api/blogs").expect(200);
    assert.strictEqual(Array.isArray(res.body), true);
    assert.strictEqual(res.body.length, initialBlogs.length);
  });
});

describe("POST /api/blogs", () => {
  test("creating a new blog", async () => {
    const newBlog = {
      title: "Supertest blog",
      author: "Sam",
      url: "http://example.com/super",
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const res = await api.get("/api/blogs");
    assert.strictEqual(res.body.length, initialBlogs.length + 1);

    const titles = res.body.map((b) => b.title);
    assert(titles.includes("Supertest blog"));
  });
});

describe("DELETE /api/blogs/:id", () => {
  test("deletes a blog", async () => {
    const res = await api.get("/api/blogs");
    const idToDelete = res.body[0].id;

    await api.delete(`/api/blogs/${idToDelete}`).expect(204);

    const resAfter = await api.get("/api/blogs");
    assert.strictEqual(resAfter.body.length, initialBlogs.length - 1);
  });
});

describe("PUT /api/blogs/:id", () => {
  test("updates likes", async () => {
    const res = await api.get("/api/blogs");
    const blogToUpdate = res.body[0];

    const updated = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };
    const res2 = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updated)
      .expect(200);

    assert.strictEqual(res2.body.likes, updated.likes);
  });
});

describe("id property", () => {
  test("unique identifier is named id", async () => {
    const res = await api.get("/api/blogs");

    res.body.forEach((blog) => {
      //check that there is an id
      assert.ok(blog.id, "Blog does not have id property");
      //check that _id does not exist
      assert.strictEqual(blog._id, undefined);
    });
  });
});

describe("POST /api/blogs with missing likes", () => {
  test("defaults likes to 0", async () => {
    const newBlog = {
      title: "Blog without likes",
      author: "Test author",
      url: "http://ruirui.com/nolikes",
    };
    const res = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    assert.strictEqual(res.body.likes, 0);
  });
});

describe("POST /api/blogs validation", () => {
  test.only("missing title returns 400", async () => {
    const newBlog = {
      author: "testerer",
      url: "http://adasdasda.com/rui",
      likes: 5,
    };
    const res = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
  test.only("missing url return 400", async () => {
    const newBlog = {
      title: "testererere",
      url: "http://adasdasda.com/ruissa",
      likes: 2,
    };
    const res = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
});
