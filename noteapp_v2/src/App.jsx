import { useEffect, useState } from "react";
import Note from "./components/Note.jsx";
import Footer from "./components/Footer";
import noteService from "./services/notes";
import logger from "../utils/logger.js";
import MessageNotification from "./components/MessageNotification";
import LoginForm from "./components/LoginForm.jsx";
import UserForm from "./components/UserForm.jsx";
const App = (props) => {
  const [showAll, setShowAll] = useState(true);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });
  const [user, setUser] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
    noteService
      .getAll()
      .then((response) => {
        setNotes(response);
        //logger.info(notes);
      })
      .catch((err) => {
        logger.error("Failed to fetch notes", err);
      });
  }, []);

  const showNotification = (
    setNotification,
    message,
    type = "success",
    duration = 2000
  ) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: null, type: null }), duration);
  };

  const deleteNote = (id) => {
    if (window.confirm("Delete this note?")) {
      noteService
        .remove(id)
        .then(() => {
          setNotes(notes.filter((n) => n.id !== id));
          showNotification(
            setNotification,
            "Note deleted successfully",
            "success"
          );
        })
        .catch((err) => {
          if (err.response?.status === 403) {
            showNotification(
              setNotification,
              "You can only delete your own notes",
              "error"
            );
          } else {
            showNotification(setNotification, "Error deleting note", "error");
          }
        });
    }
  };
  const toggleImportanceOf = (id) => {
    //logger.info("notes:", notes);
    // logger.info("toggling id:", id);
    const note = notes.find((n) => n.id === id);
    if (!note) return;
    const changedNote = { important: !note.important };

    noteService
      .update(id, changedNote)
      .then((response) => {
        setNotes(notes.map((n) => (n.id === id ? response : n)));
      })
      .catch((error) => {
        setNotification({
          message: `Note '${note.content}' was already removed from server`,
          type: "error",
        });
        setTimeout(() => {
          setNotification({ message: null, type: null });
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

    noteService
      .create(noteObject)
      .then((note) => {
        setNotes(notes.concat(note));
        setNewNote("");
        showNotification(
          setNotification,
          `Note added: "${note.content}"`,
          "success",
          1000
        );
      })
      .catch((err) => {
        console.error(err);
        showNotification(setNotification, "Failed to add note", "error", 3000);
      });
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    noteService.setToken(null);
    setNotification({ message: "Logged out successfully", type: "success" });
    setTimeout(() => setNotification({ message: null, type: null }), 5000);
  };
  const handleNoteChange = (event) => {
    //logger.info("note value", event.target.value);
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
      {user && (
        <div className="user-bar">
          <span className="user-name">{user.name} logged in</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
      {!user && (
        <LoginForm setUser={setUser} setNotification={setNotification} />
      )}

      <h1>Notes</h1>
      <MessageNotification notification={notification} />

      <div>
        <button className="filter-btn" onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>

        <button
          className="filter-btn"
          onClick={() => setShowUserForm(!showUserForm)}
        >
          {showUserForm ? "Back to Notes" : "Create New User"}
        </button>
      </div>

      {showUserForm ? (
        <UserForm />
      ) : (
        <>
          <ul className="note-list">
            {notesToShow.map(
              (note) =>
                note && (
                  <Note
                    key={note.id}
                    note={note}
                    toggleImportance={
                      user ? () => toggleImportanceOf(note.id) : null
                    }
                    deleteNote={() => deleteNote(note.id)}
                    user={user}
                  />
                )
            )}
          </ul>

          <form onSubmit={addNote}>
            <input
              className="note-input"
              value={newNote}
              onChange={handleNoteChange}
              disabled={!user}
            />
            <button className="add-btn" type="submit" disabled={!user}>
              Save
            </button>
          </form>
        </>
      )}

      <Footer />
    </div>
  );
};

export default App;
