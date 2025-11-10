import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();
const Person = (await import("./models/person.js")).default;
console.log("Person import", Person);
const app = express();

app.use(cors());
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

//GET all persons from database
app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/info", (req, res) => {
  const date = new Date();
  Person.countDocuments({})
    .then((count) => {
      res.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`);
    })
    .catch((error) => next(error));
});

//search by id
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

//deleting a person

app.delete("/api/persons/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const deletedPerson = await Person.findByIdAndDelete(id);

    if (!deletedPerson) {
      return res.status(404).json({ error: "person not found" });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});
// adding a new person
app.post("/api/persons", async (req, res, next) => {
  try {
    const body = req.body;

    if (!body.name || !body.number) {
      return res.status(400).json({ error: "name or number missing" });
    }
    const person = new Person({
      name: body.name,
      number: body.number,
    });

    const savedPerson = await person.save();
    res.json(savedPerson);
  } catch (error) {
    next(error);
  }
});
//update a number
app.put("/api/persons/:id", async (req, res, next) => {
  try {
    const { number } = req.body;
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      { number },
      { new: true, runValidators: true, context: "query" }
    );
    if (!updatedPerson) {
      return res.status(404).json({ error: "person not found" });
    }

    res.json(updatedPerson);
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);
app.use(express.static(path.join(__dirname, "dist")));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
