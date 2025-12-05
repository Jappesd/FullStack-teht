import { Router } from "express";
import Note from "../models/note.js";
import { userExtractor } from "../utils/middleware.js";
import User from "../models/users.js";
const noteRouter = Router();

// get all notes
noteRouter.get("/", async (req, res, next) => {
  try {
    const notes = await Note.find({}).populate("user", {
      username: 1,
      name: 1,
      id: 1,
    });
    res.json(notes);
  } catch (error) {
    next(error);
  }
});
// find by id
noteRouter.get("/:id", async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    //ternary operator: if note exists, send it else 404
    note ? res.json(note) : res.status(404).end();
  } catch (err) {
    next(err);
  }
});
//post new note
noteRouter.post("/", userExtractor, async (req, res, next) => {
  try {
    const user = req.user; // comes from userExtractor
    if (!user) {
      return res.status(401).json({ error: "user missing or invalid" });
    }
    // Ensure the notes array exists
    if (!user.notes) {
      user.notes = [];
    }

    const note = new Note({
      content: req.body.content,
      important: req.body.important || false,
      user: user._id, // link note to user
    });

    const savedNote = await note.save();

    // Add note reference to user's notes array
    user.notes.push(savedNote._id);
    await user.save();

    res.status(201).json(savedNote);
  } catch (err) {
    next(err);
  }
});

//delete note by id
noteRouter.delete("/:id", userExtractor, async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).end();
    // only owner of the post can delete it (or admin later)
    if (note.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res
        .status(403)
        .json({ error: "Forbidden: you can only delete your own posts" });
    }
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

//update note's important state
noteRouter.put("/:id", userExtractor, async (req, res, next) => {
  try {
    const updated = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

export default noteRouter;
