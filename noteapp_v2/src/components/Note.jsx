const Note = ({ note, user, toggleImportance, deleteNote }) => {
  const label = note.important ? "make not important" : "make important";

  const formattedDate = new Date(note.createdAt).toLocaleString();

  return (
    <li className={`note-item ${note.important ? "important" : ""}`}>
      <div>
        <span>{note.content}</span>
        <div className="note-meta">
          <small>
            by {note.user.name} at {formattedDate}
          </small>
        </div>
      </div>
      {user && (
        <div className="actions">
          {toggleImportance && (
            <button onClick={toggleImportance} className="toggle-btn">
              {label}
            </button>
          )}
          {deleteNote && (
            <button onClick={deleteNote} className="delete-btn">
              Delete
            </button>
          )}
        </div>
      )}
    </li>
  );
};

export default Note;
