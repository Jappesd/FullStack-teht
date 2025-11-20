import { Router } from "express";
import { getNoteModel } from "../models/note.js";
import { getUserModel } from "../models/users.js";
import { userExtractor } from "../utils/middleware.js";

const noteRouter = Router();

// get all notes
noteRouter.get("/", async (req, res, next) => {
  try {
    const Note = await getNoteModel();
    const User = await getUserModel();
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
    const Note = await getNoteModel();
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
    const Note = await getNoteModel();
    const user = req.user; // comes from userExtractor

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
noteRouter.delete("/:id", async (req, res, next) => {
  try {
    const Note = await getNoteModel();
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

//update note's important state
noteRouter.put("/:id", async (req, res, next) => {
  try {
    const Note = await getNoteModel();
    const updated = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {}
});

export default noteRouter;
