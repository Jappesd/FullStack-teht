const url = "http://localhost:3001/anecdotes";

export const getAnecs = async () => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("failed to GET");
  return await res.json();
};

export const createAnec = async (anec) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...anec, votes: 0 }),
  });
  if (!res.ok) throw new Error("failed to create");
  return res.json();
};

export const voteAnec = async (anec) => {
  const updated = { ...anec, votes: anec.votes + 1 };
  const res = await fetch(`${url}/${anec.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated),
  });
  if (!res.ok) throw new Error("failed to vote");
  return res.json();
};
