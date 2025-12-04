import { useSelector, useDispatch } from "react-redux";
import { updateAnec } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecs = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  console.log(anecs);
  const visibleAnecs = anecs
    .filter((a) => a.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes);

  const voter = (anec) => {
    dispatch(updateAnec(anec));
    dispatch(showNotification(`You voted for "${anec.content}"`), 5000);
  };
  return (
    <div>
      <h2>Anecdotes</h2>
      {visibleAnecs.map((a) => (
        <div key={a.id}>
          <div>{a.content}</div>
          <div>
            has {a.votes}
            <button onClick={() => voter(a)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
