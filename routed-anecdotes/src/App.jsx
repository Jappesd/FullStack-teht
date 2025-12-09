import { useState } from "react";
import { useField } from "./hooks";
import { useNavigate, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import AnecdoteList from "./components/AnecdoteList";
import CreateNew from "./components/CreateNew";
import About from "./components/About";
import Anecdote from "./components/Anecdote";
import Footer from "./components/Footer";
const App = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState("");
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    navigate("/");
    setNotification(`A new anecdote "${anecdote.content}" created!`);
    setTimeout(() => setNotification(""), 5000);
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      {notification && (
        <div
          style={{ border: "1px solid green", padding: 10, marginBottom: 10 }}
        >
          {notification}
        </div>
      )}
      <Menu />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdotes={anecdotes} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
