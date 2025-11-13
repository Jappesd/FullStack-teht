# Fullstack Project Setup Guide (with Render Deployment)

This guide explains how to start a **fullstack project** with:

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Deployment:** Local development and Render deployment

---

## 1️⃣ Create project folder

```bash
mkdir my-fullstack-app
cd my-fullstack-app
```

This will be the **root folder** containing both frontend and backend code.

---

## 2️⃣ Initialize Git & Node

```bash
git init
npm init -y
```

- Initializes Git for version control.
- Creates a `package.json` to manage backend dependencies.

---

## 3️⃣ Set up backend

```bash
npm install express mongoose cors dotenv
npm install -D nodemon
```

- **express** → backend server
- **mongoose** → MongoDB object modeling
- **cors** → allow frontend requests
- **dotenv** → environment variables
- **nodemon** → auto-restart backend during development

Create `index.js` (or `app.js`) for the backend:

```js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

## 4️⃣ Set up frontend (React + Vite)

```bash
npm create vite@latest src
cd src
npm install
```

- Creates a Vite + React project inside `src/`.
- `src/` will be the frontend folder.

---

### 4a. Configure Axios base URL

Inside your frontend, create `comms.js` for API calls:

```js
import axios from "axios";

const baseUrl =
  (import.meta.env.VITE_BACKEND_URL || "http://localhost:3001") +
  "/api/persons";

const getAll = () => axios.get(baseUrl).then((res) => res.data);
const create = (newObject) =>
  axios.post(baseUrl, newObject).then((res) => res.data);
const update = (id, newObject) =>
  axios.put(`${baseUrl}/${id}`, newObject).then((res) => res.data);
const remove = (id) => axios.delete(`${baseUrl}/${id}`).then((res) => res.data);

export default { getAll, create, update, remove };
```

---

## 5️⃣ Environment variables

- **Backend `.env`**:

```
PORT=3001
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname
```

- **Frontend `.env`** (inside `src/`):

```
VITE_BACKEND_URL=https://your-backend-url.onrender.com
```

> **Note:** Frontend `.env` variables must start with `VITE_` to be accessible with `import.meta.env`.

- **Render Deployment**:
  - Add `MONGODB_URI` and any other secrets in Render dashboard.
  - Add `VITE_BACKEND_URL` if needed for frontend environment.

---

## 6️⃣ Backend routes example

```js
app.get("/api/persons", async (req, res) => {
  const persons = await Person.find({});
  res.json(persons);
});

app.post("/api/persons", async (req, res, next) => {
  const { name, number } = req.body;
  const person = new Person({ name, number });
  try {
    const savedPerson = await person.save();
    res.json(savedPerson);
  } catch (error) {
    next(error);
  }
});
```

Include **error handling** at the bottom:

```js
const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  if (err.name === "CastError")
    return res.status(400).send({ error: "malformatted id" });
  if (err.name === "ValidationError")
    return res.status(400).json({ error: err.message });
  next(err);
};

app.use(errorHandler);
```

---

## 7️⃣ Serve frontend from backend

Add at the **bottom** of `index.js`:

```js
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
```

---

## 8️⃣ Frontend build

- In development:

  ```bash
  cd src
  npm run dev
  ```

  No build needed; uses Vite dev server.

- For production:
  ```bash
  cd src
  npm run build
  ```
  - Generates `dist/` folder.
  - Backend serves `dist/` automatically.

---

## 9️⃣ Package.json scripts (optional fullstack convenience)

```json
{
  "scripts": {
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "server": "nodemon index.js",
    "client": "cd src && npm run dev",
    "build": "cd src && npm run build",
    "start": "npm run build && node index.js"
  }
}
```

- `npm run dev` → local development
- `npm run build` → production frontend build
- `npm run start` → production deploy on Render

---

## 10️⃣ Deployment to Render

1. Create a **Web Service** in Render, root folder as project root.
2. **Build Command**: `npm run start` (this will build frontend + start backend)
3. **Environment Variables**: Add `MONGODB_URI` and optionally `VITE_BACKEND_URL`.
4. **Automatic Deploys**: Render will run `npm run start` each time you push to Git.

✅ Users can access: `https://your-app.onrender.com/`

- Frontend served from `dist/`
- Backend APIs available at `/api/*`

---

**This setup creates a fullstack React + Vite + Node + MongoDB app ready for local development and Render deployment.**

**Mongoose Global transform reusable**

<!-- mongoose.Schema.prototype.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();  // rename _id to id
    delete ret._id;               // remove _id
    delete ret.__v;               // remove __v
  }
}); -->
