import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNew = (e) => {
    e.preventDefault();
    const cont = e.target.note.value;
    if (!cont) return;
    dispatch(createAnecdote(cont));
    dispatch(showNotification(`A new anecdote "${cont}" added!`), 5000);
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
