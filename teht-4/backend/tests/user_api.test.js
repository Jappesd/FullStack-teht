import request from "supertest";
import assert from "node:assert";
import { describe, test } from "node:test";
import app from "../app.js"; // make sure this points to your Express app

const api = request(app);

describe("POST /api/users", () => {
  test("creates a new user and hides the passwordHash", async () => {
    const newUser = {
      username: "sammy",
      name: "Sam",
      password: "secret123",
    };

    const res = await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(res.body.username, newUser.username);
    assert.strictEqual(res.body.name, newUser.name);
    assert.strictEqual(res.body.passwordHash, undefined); // ensure hash not returned
    assert.ok(res.body.id, "Response should have an id");
  });
});
