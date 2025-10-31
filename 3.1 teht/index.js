const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json());
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
// app.get("/", (request, response) => {
//   response.send("Rokuli");
// });

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (req, res) => {
  const count = persons.length;
  const date = new Date();
  res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${date}</p>
        `);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const single = persons.find((n) => n.id === id);
  if (!single) {
    return res.status(404).json({ error: "Id not found" });
  }
  res.json(single);
});

app.listen(3001, () => {
  console.log("Listening to port:", 3001);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((p) => p.id !== id);

  res.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({ error: "Name or number missing" });
  }
  const nameExists = persons.find((p) => p.name === body.name);
  if (nameExists) {
    return response.status(400).json({ error: "name must be unique" });
  }
  const newId = Math.floor(Math.random() * 100000);
  const newPerson = {
    id: newId,
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(newPerson);
  response.json(newPerson);
});
