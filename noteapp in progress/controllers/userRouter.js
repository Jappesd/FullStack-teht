import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/users.js";
import Note from "../models/note.js";

const userRouter = Router();

// GET all users
userRouter.get("/", async (req, res, next) => {
  try {
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
      return res.status(400).json({
        error: "username and password required",
      });
    }

    if (password.length < 3) {
      return res.status(400).json({
        error: "password must be at least 3 characters long",
      });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        error: "username must be unique",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
});

export default userRouter;
