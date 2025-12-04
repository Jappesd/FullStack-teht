const url = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch backend data");
  }
  return await res.json();
};

const createAnec = async (content) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, votes: 0 }),
  };
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error("Failed to add");
  }
  return await res.json();
};

const updateAnec = async (anec) => {
  const res = await fetch(`${url}/${anec.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(anec),
  });
  if (!res.ok) throw new Error("Failed to update note");
  return res.json();
};
export default { getAll, createAnec, updateAnec };
