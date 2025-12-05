import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnec } from "../requests";

const AnecdoteForm = () => {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const newAnecMutation = useMutation({
    mutationFn: createAnec,
    onSuccess: (newAnec) => {
      const current = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], current.concat(newAnec));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim().length < 5) {
      alert("anecdote must be atleast 5 characters");
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
