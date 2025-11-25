import "./test_config.js";
import test, { before, after } from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";

const api = supertest(app);

before(async () => {
  await mongoose.connect(process.env.MONGO_URL);
});

after(async () => {
  await mongoose.connection.close();
});

test("adding a blog fails without token", async () => {
  const blog = {
    title: "Unauthorized Blog",
    author: "Hacker",
    url: "http://hack.com",
    likes: 0,
  };

  const res = await api.post("/api/blogs").send(blog).expect(401);

  assert.match(res.body.error, /token missing or invalid/i);
});
