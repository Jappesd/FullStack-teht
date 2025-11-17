import { test, describe, before, after, beforeEach } from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../app.js";
import { userConnection } from "../utils/connections.js";
import { User } from "../models/users.js";

const api = request(app);

//clean users from db before each test
beforeEach(async () => {
  await User.deleteMany({});
});
//close connection after test
after(async () => {
  await userConnection.close();
});

//post test
describe("POST /api/users", () => {
  test("creates a new user with valid data", async () => {
    const newUser = {
      username: "sammy",
      name: "Sam",
      password: "secret123",
    };
    const res = await api
      .post("/api/users")
      .send(newUser)
      .expect(201) //expect HTTP 201 "created"
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(res.body.username, newUser.username);
    assert.ok(res.body.id, "Response should have an id");
    assert.strictEqual(res.body.name, newUser.name);

    //ensure passwordHash is not returned
    assert.strictEqual(res.body.passwordHash, undefined);
    //verify directly from DB
    const userInDB = await User.findOne({ username: "sammy" });
    assert.ok(userInDB, "user should be saved to db");
  });

  test("Fails with 400 if username or password missing", async () => {
    const newUser = { name: "noUserName" };
    await api.post("/api/users").send(newUser).expect(400);
  });
});
