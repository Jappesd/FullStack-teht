import { Router } from "express";
import { getNoteModel } from "../models/note.js";
import { getUserModel } from "../models/users.js";
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
noteRouter.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const User = await getUserModel();
    const Note = await getNoteModel();
    const user = await User.findById(body.userId);
    if (!user) {
      return res.status(400).json({ error: "userId missing or not valid" });
    }
    const note = new Note({
      content: body.content,
      important: body.important || false,
      user: user._id,
    });
    const saved = await note.save();
    user.notes = user.notes.concat(saved._id);
    await user.save();
    res.status(201).json(saved);
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
