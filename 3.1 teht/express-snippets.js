// ------------------------
// Basic Express Setup
// ------------------------
const express = require("express");
const app = express();
app.use(express.json()); // Middleware for parsing JSON

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ------------------------
// Routes
// ------------------------

// 1. GET all items
app.get("/api/items", (req, res) => {
  res.json(items);
});

// 2. GET single item by ID
app.get("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = items.find((i) => i.id === id);

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  res.json(item);
});

// 3. POST (add new item)
app.post("/api/items", (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({ error: "Name missing" });
  }

  const newItem = {
    id: Math.floor(Math.random() * 10000),
    name: body.name,
  };

  items = items.concat(newItem);
  res.status(201).json(newItem);
});

// 4. DELETE item
app.delete("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);
  items = items.filter((i) => i.id !== id);
  res.status(204).end();
});

// ------------------------
// Utility Route Example
// ------------------------
app.get("/api/info", (req, res) => {
  const date = new Date();
  res.send(`<p>Database has info for ${items.length} items</p><p>${date}</p>`);
});
