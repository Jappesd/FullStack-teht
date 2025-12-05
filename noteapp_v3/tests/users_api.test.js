import { test, describe, before, after, beforeEach } from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../app.js";
import { getUserModel } from "../models/users.js";
import { closeConnections } from "../utils/connections.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const api = request(app);

let server;
let User;

before(async () => {
  server = app.listen(0); // ephemeral port
  User = await getUserModel(process.env.TEST_MONGODB); // pass test URL
  console.log("Connected to test db");
});

beforeEach(async () => {
  await User.deleteMany({});

  const users = [
    {
      username: "sammy",
      name: "Sam",
      passwordHash: await bcrypt.hash("secret123", 10),
    },
    {
      username: "alice",
      name: "Alice",
      passwordHash: await bcrypt.hash("mypassword", 10),
    },
  ];

  await User.insertMany(users);
});

after(async () => {
  await closeConnections();
  await mongoose.disconnect();
  await server.close();
});

// GET users test
describe("GET /api/users", () => {
  test("returns all users", async () => {
    const res = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /json/);

    assert.strictEqual(res.body.length, 2);
    const usernames = res.body.map((u) => u.username);
    assert.ok(usernames.includes("sammy"));
    assert.ok(usernames.includes("alice"));

    res.body.forEach((user) => {
      assert.strictEqual(user.passwordHash, undefined);
    });
  });
});

// POST user test
describe("POST /api/users", () => {
  test("creates a new user with valid data", async () => {
    const newUser = { username: "bob", name: "Bob", password: "mypassword" };
    const res = await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /json/);

    assert.strictEqual(res.body.username, newUser.username);
    assert.ok(res.body.id);
    assert.strictEqual(res.body.name, newUser.name);
    assert.strictEqual(res.body.passwordHash, undefined);

    const userInDB = await User.findOne({ username: newUser.username });
    assert.ok(userInDB);
  });

  test("fails with 400 if username or password missing", async () => {
    const newUser = { name: "noUserName" };
    await api.post("/api/users").send(newUser).expect(400);
  });
});
