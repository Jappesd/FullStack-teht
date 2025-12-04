const baseUrl = "http://localhost:3001/notes";

const getAll = async () => {
  const res = await fetch(baseUrl);
  if (!res.ok) {
    throw new Error("failed to fetch notes");
  }

  return await res.json();
};

const createNew = async (content) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, important: false }),
  };
  const res = await fetch(baseUrl, options);
  if (!res.ok) {
    throw new Error("Failed to create note");
  }
  return await res.json();
};

export default { getAll, createNew };
