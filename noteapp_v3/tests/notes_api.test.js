import { test, describe, before, after, beforeEach } from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../app.js";
import { getUserModel } from "../models/users.js";
import { getNoteModel } from "../models/note.js";
import { getConnection, closeConnections } from "../utils/connections.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const api = request(app);

let server;
let User;
let Note;
let token;
let userId;

before(async () => {
  server = app.listen(0);
  User = await getUserModel(process.env.TEST_MONGO_USER);
  Note = await getNoteModel(process.env.TEST_MONGODB); // if using separate note DB
});

beforeEach(async () => {
  await User.deleteMany({});
  await Note.deleteMany({});

  const passwordHash = await bcrypt.hash("secret123", 10);
  const user = await User.create({
    username: "sammy",
    name: "Sam",
    passwordHash,
  });
  userId = user.id;

  token = jwt.sign({ id: user.id }, process.env.SECRET);
});

after(async () => {
  await closeConnections();
  await server.close();
});

describe("POST /api/notes with authentication", () => {
  test("successfully creates a note for logged-in user", async () => {
    const newNote = { content: "Test note content", important: true, userId };
    const res = await api
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send(newNote)
      .expect(201);

    assert.strictEqual(res.body.content, newNote.content);
    assert.strictEqual(res.body.important, newNote.important);
    assert.strictEqual(res.body.user, userId);

    const noteInDB = await Note.findById(res.body.id);
    assert.ok(noteInDB, "note should be saved in DB");
  });

  test("fails with 401 if token is missing", async () => {
    await api.post("/api/notes").send({ content: "Should fail" }).expect(401);
  });
});
