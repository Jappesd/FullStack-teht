import { useState, useEffect } from "react";
import noteService from "../services/notes";
import logger from "../../utils/logger";
import Note from "../components/Note";
import MessageNotification from "../components/MessageNotification";
import UserForm from "../components/UserForm";
import { useNotification } from "../context/NotificationContext";
import { useUser } from "../context/UserContext";
const NotesPage = () => {
  const [showAll, setShowAll] = useState(true);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const { notification, showNotification } = useNotification();
  const { user, logoutUser } = useUser();
  const [showUserForm, setShowUserForm] = useState(false);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      noteService.setToken(user.token);
    }
    noteService
      .getAll()
      .then((data) => setNotes(data))
      .catch((err) => logger.error("Failed to fetch notes", err));
  }, []);

  const addNote = (e) => {
    e.preventDefault();

    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    };
    noteService
      .create(noteObject)
      .then((note) => {
        setNotes(notes.concat(note));
        setNewNote("");
        showNotification(`Note added: "${note.content}"`);
      })
      .catch((err) => {
        showNotification("Failed to add note", "error");
        logger.error(err);
      });
  };
  const deleteNote = (id) => {
    if (window.confirm("Delete this note?")) {
      noteService
        .remove(id)
        .then(() => {
          setNotes(notes.filter((n) => n.id !== id));
          showNotification("Note deleted", "success", 2000);
        })
        .catch((err) => {
          if (err.response?.status === 403) {
            showNotification("You can only delete your own notes", "error");
          } else {
            showNotification("Error deleting note", "error");
            logger.error(err);
          }
        });
    }
  };
  const handleLogout = () => {
    logoutUser();
    showNotification("Logged out successfully", "success");
  };
  const toggleImportanceOf = (id) => {
    const note = notes.find(() => n.id === id);
    if (!note) return;

    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((updated) =>
        setNotes(notes.map((n) => (n.id === id ? updated : n)))
      )
      .catch((err) => {
        logger.error(err);
        showNotification(
          `Note "${note.content}" was already removed from server`,
          "error",
          5000
        );
        setNotes(notes.filter((note) => note.id !== id));
      });
  };
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <>
      <h1>Notes</h1>
      <div>
        {user && (
          <div className="user-bar">
            <span>{user.name} logged in</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
        <button className="filter-btn" onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>

      {showUserForm ? (
        <UserForm />
      ) : (
        <>
          <ul className="note-list">
            {notesToShow.map((note) => (
              <Note
                key={note.id}
                note={note}
                toggleImportance={
                  user ? () => toggleImportanceOf(note.id) : null
                }
                deleteNote={() => deleteNote(note.id)}
                user={user}
              />
            ))}
          </ul>

          {user && (
            <form onSubmit={addNote}>
              <input
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
              <button className="add-btn" type="submit">
                Save
              </button>
            </form>
          )}
        </>
      )}
    </>
  );
};
export default NotesPage;
