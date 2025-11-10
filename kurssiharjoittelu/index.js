import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
const app = express();
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const { default: Note } = await import("./models/note.js");
console.log("Backend index.js loaded");
app.use(cors());
app.use(json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "dist")));

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

let notes = [
  { id: 1, content: "HTML is easy", important: true },
  { id: 2, content: "Browser can execute only JavaScript", important: false },
  { id: 3, content: "GET and POST are important methods", important: true },
];
app.get("/", (req, res) => {
  res.send("<h1>Notes API is running</h1>");
});
app.get("/api/notes", async (req, res) => {
  const notes = await Note.find({});
  res.json(notes);
});
app.post("/api/notes", (req, res, next) => {
  const body = req.body;
  if (!body.content) {
    return res.status(400).json({ error: "content missing" });
  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
  });
  note
    .save()
    .then((savedNote) => {
      res.json(savedNote);
    })
    .catch((error) => next(error));
});
app.put("/api/notes/:id", (req, res) => {
  const { content, important } = req.body;

  Note.findByIdAndUpdate(
    req.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedNote) => {
      if (updatedNote) {
        res.json(updatedNote);
      } else {
        res.status(404).end;
      }
    })
    .catch((err) => next(err));
});

app.delete("/api/notes/:id", async (req, res) => {
  try {
    const result = await Note.findByIdAndDelete(req.params.id);
    if (result) {
      res.status(204).end(); // means successfully deleted
    } else {
      res.status(404).json({ error: "Note not found" });
    }
  } catch (err) {
    next(err);
  }
});
app.use(errorHandler);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
