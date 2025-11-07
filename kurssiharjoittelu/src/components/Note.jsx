const Note = ({ note, toggleImportance, deleteNote }) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li className="note">
      {note.content}
      <button style={{ marginLeft: "20px" }} onClick={toggleImportance}>
        {label}
      </button>
      <button style={{ marginLeft: "20px" }} onClick={deleteNote}>
        delete
      </button>
    </li>
  );
};
export default Note;
