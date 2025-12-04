import { useDispatch } from "react-redux";
import { creator } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";
import anecService from "../services/anecdotes";
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNew = async (e) => {
    e.preventDefault();
    const cont = e.target.note.value;
    if (!cont) return;
    dispatch(creator(cont));
    e.target.note.value = "";
  };
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addNew}>
        <input name="note" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};
export default AnecdoteForm;
