import { Router } from "express";
import { Note } from "../models/note.js";

const noteRouter = Router();

// get all notes
noteRouter.get("/", async (req, res) => {
  const notes = await Note.find({});
  res.json(notes);
});
// find by id
noteRouter.get("/:id", async (req, res, next) => {
  try {
    const note = Note.findById(req.params.id);
    note ? res.json(note) : res.status(404).end();
  } catch (err) {
    next(err);
  }
});
//post new note
noteRouter.post("/", async (req, res, next) => {
  const { content, important, user } = req.body;
  const note = new Note({ content, important, user });
  try {
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (err) {
    next(err);
  }
});

//delete note by id
noteRouter.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await Note.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).end();
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default noteRouter;
