import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecs = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  const visibleAnecs = anecs
    .filter((a) => a.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes);

  const voter = (id, content) => {
    dispatch(vote(id));
    dispatch(showNotification(`You voted for "${content}"`), 5000);
  };
  return (
    <div>
      <h2>Anecdotes</h2>
      {visibleAnecs.map((a) => (
        <div key={a.id}>
          <div>{a.content}</div>
          <div>
            has {a.votes}
            <button onClick={() => voter(a.id, a.content)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
