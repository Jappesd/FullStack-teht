import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import { User } from "../connections/Schema.js";
import dotenv from "dotenv";
dotenv.config();
const loginRouter = express.Router();

loginRouter.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    console.log("Login attempt:", username, "found user: ", !!user);
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: "1h",
    });

    res.status(200).send({
      token,
      username: user.username,
      name: user.name,
    });
  } catch (error) {
    next(error);
  }
});

export default loginRouter;
