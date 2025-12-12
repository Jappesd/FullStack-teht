import { useNavigate } from "react-router-dom";

const NoteButton = ({ noteId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/notes/${noteId}`);
  };

  return (
    <button onClick={handleClick} className="btn btn-primary btn-sm">
      View
    </button>
  );
};
export default NoteButton;
