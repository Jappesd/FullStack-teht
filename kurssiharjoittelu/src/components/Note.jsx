const Note = ({ note, toggleImportance, deleteNote }) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li className={`note-item ${note.important ? "important" : ""}`}>
      <span>{note.content}</span>
      <button className="toggle-btn" onClick={toggleImportance}>
        {label}
      </button>
      <button className="delete-btn" onClick={deleteNote}>
        delete
      </button>
    </li>
  );
};
export default Note;
