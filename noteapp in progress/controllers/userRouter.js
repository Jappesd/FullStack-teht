import { Router } from "express";
import bcrypt from "bcrypt";
import { getUserModel } from "../models/users.js"; // assume getUserModel wraps getUserConnection + model
import { getNoteModel } from "../models/note.js";

const userRouter = Router();

// GET all users
userRouter.get("/", async (req, res, next) => {
  try {
    const User = await getUserModel();
    const Note = await getNoteModel();
    const users = await User.find({}).populate("notes", {
      content: 1,
      important: 1,
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// POST new user
userRouter.post("/", async (req, res, next) => {
  try {
    const { username, password, name } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "username and password required" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const User = await getUserModel();
    const user = new User({ username, name, passwordHash });
    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
});

export default userRouter;
