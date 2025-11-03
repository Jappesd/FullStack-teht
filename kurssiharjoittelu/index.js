import express, { json } from "express";
const app = express();
import cors from "cors";

app.use(cors());
app.use(json());

let notes = [
  { id: 1, content: "HTML is easy", important: true },
  { id: 2, content: "Browser can execute only JavaScript", important: false },
  { id: 3, content: "GET and POST are important methods", important: true },
];

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
