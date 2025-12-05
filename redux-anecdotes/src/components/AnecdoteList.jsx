import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "./NotificationContext";
import { getAnecs, voteAnec } from "../requests";

const AnecdoteList = () => {
  const queryClient = useQueryClient();
  const { dispatchMsg } = useNotification();
  const {
    data: anecdotes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecs,
    retry: 1,
  });

  const voteMutation = useMutation({
    mutationFn: voteAnec,
    onSuccess: (updated) => {
      const current = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        current.map((a) => (a.id === updated.id ? updated : a))
      );
    },
  });
  if (isLoading) return <p>loading...</p>;
  if (isError) return <p>server error</p>;
  const voter = (anec) => {
    voteMutation.mutate(anec, {
      onSuccess: () => {
        dispatchMsg({
          type: "SET",
          payload: `You voted for '${anec.content}'`,
        });
        setTimeout(() => dispatchMsg({ type: "CLEAR" }), 2000);
      },
    });
  };
  return (
    <div>
      <h2>Anecdotes</h2>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map((a) => (
          <div className="anecdote" key={a.id}>
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
