import express, { json } from "express";
const app = express();
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
app.use(cors());
app.use(json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "dist")));

let notes = [
  { id: 1, content: "HTML is easy", important: true },
  { id: 2, content: "Browser can execute only JavaScript", important: false },
  { id: 3, content: "GET and POST are important methods", important: true },
];
app.get("/", (req, res) => {
  res.send("<h1>Notes API is running</h1>");
});
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  const body = req.body;
  if (!body.content) {
    return res.status(400).json({ error: "content missing" });
  }
  const note = {
    id: Math.floor(Math.random() * 100000),
    content: body.content,
    important: body.important || false,
  };
  notes = notes.concat(note);
  res.json(note);
});
app.put("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;

  const note = notes.find((n) => n.id === id);
  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }
  const updatedNote = { ...note, important: body.important };
  notes = notes.map((n) => (n.id !== id ? n : updatedNote));
  res.json(updatedNote);
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
