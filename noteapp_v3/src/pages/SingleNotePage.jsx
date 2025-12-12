import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import noteService from "../services/notes";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const SingleNotePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const handleNav = () => {
    navigate("/notes");
  };
  useEffect(() => {
    noteService.getAll().then((notes) => {
      setNote(notes.find((n) => n.id === id));
    });
  }, [id]);

  if (!note) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={handleNav}>Back</button>
      <h2>Note Details</h2>
      <p>{note.content}</p>
      <p>Important: {note.important ? "Yes" : "No"}</p>
    </div>
  );
};
export default SingleNotePage;
