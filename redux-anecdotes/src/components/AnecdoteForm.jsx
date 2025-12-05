import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnec } from "../requests";
import { useNotification } from "./NotificationContext";
const AnecdoteForm = () => {
  const { dispatchMsg } = useNotification();
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const newAnecMutation = useMutation({
    mutationFn: createAnec,
    onSuccess: (newAnec) => {
      const current = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], current.concat(newAnec));
      dispatchMsg({
        type: "SET",
        payload: `New anecdote '${newAnec.content}' added!`,
      });
      setTimeout(() => dispatchMsg({ type: "CLEAR" }), 2000);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim().length < 5) {
      dispatchMsg({
        type: "SET",
        payload: "The new anecdote must be atleast 5 characters",
      });
      setTimeout(() => dispatchMsg({ type: "CLEAR" }), 2000);
      return;
    }
    newAnecMutation.mutate({ content });
    setContent("");
  };
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <input value={content} onChange={(e) => setContent(e.target.value)} />
        <button type="submit">create</button>
      </form>
    </div>
  );
};
export default AnecdoteForm;
