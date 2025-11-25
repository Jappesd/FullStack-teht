import express from "express";
import bcrypt from "bcrypt";
import { User } from "../connections/Schema.js";

const usersRouter = express.Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const { username, name, password } = req.body;

    if (!password || password.length < 3) {
      return res
        .status(400)
        .json({ error: "Password must be atleast 3 characters long" });
    }

    if (!username || username.length < 3) {
      return res
        .status(400)
        .json({ error: "Username must be atleast 3 characters" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.find({}).populate("blogs", {
      title: 1,
      author: 1,
      url: 1,
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
