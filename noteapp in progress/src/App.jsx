import { useEffect, useState } from "react";
import Note from "./components/Note.jsx";
import Footer from "./components/Footer";
import noteService from "./services/notes";
import logger from "../utils/logger.js";
import MessageNotification from "./components/MessageNotification";
import LoginForm from "./components/LoginForm.jsx";
const App = (props) => {
  const [showAll, setShowAll] = useState(true);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    noteService.getAll().then((response) => {
      setNotes(response.data);
    });
  }, []);

  const handleLogin = (event) => {
    logger.info(`Loggin attempt with user:${username}`);
  };

  const deleteNote = (id) => {
    if (window.confirm("Delete this note?")) {
      noteService
        .remove(id)
        .then(() => {
          setNotes(notes.filter((n) => n.id !== id));
        })
        .catch((err) => console.log("Error deleting note: ", err.message));
    }
  };
  const toggleImportanceOf = (id) => {
    //logger.info("notes:", notes);
    logger.info("toggling id:", id);
    const note = notes.find((n) => n.id === id);
    if (!note) return;
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((response) => {
        setNotes(notes.map((n) => (n.id === response.id ? response : n)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };
  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    };
    noteService.create(noteObject).then((response) => {
      setNotes(notes.concat(response.data));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    logger.info("note value", event.target.value);
    setNewNote(event.target.value);
  };
  const notesToShow = Array.isArray(notes)
    ? showAll
      ? notes
      : notes.filter((note) => note.important)
    : [];
  //logger.info("notesToShow: ", notesToShow);
  //logger.info("notes: ", notes);
  return (
    <div className="app-container">
      <LoginForm onLogin={handleLogin} />
      <h1>Notes</h1>
      <MessageNotification message={errorMessage} />
      <div>
        <button
          className="filter-btn"
          onClick={() => {
            logger.info("Toggling showAll to:", !showAll);
            setShowAll(!showAll);
          }}
        >
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul className="note-list">
        {(notesToShow || []).map(
          (note) =>
            note && (
              <Note
                key={note.id}
                note={note}
                toggleImportance={() => toggleImportanceOf(note.id)}
                deleteNote={() => deleteNote(note.id)}
              />
            )
        )}
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button className="add-btn" type="Submit">
          Save
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
