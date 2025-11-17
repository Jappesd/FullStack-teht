import { Router } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/users.js";

const userRouter = Router();

userRouter.post("/", async (req, res, next) => {
  const { username, password, name } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "username and password required" });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ username, name, passwordHash });
  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

export default userRouter;
