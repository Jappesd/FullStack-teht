const url = "http://localhost:3001/notes";

export const getNotes = async () => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("failed to fetch");
  return await res.json();
};
export const createNote = async (note) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  };
  const res = await fetch(url, options);
  if (!res.ok) throw new Error("failed to create note");
  return await res.json();
};
export const updateNote = async (updatedNote) => {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedNote),
  };
  const res = await fetch(`${url}/${updatedNote.id}`, options);
  if (!res.ok) throw new Error("failed to update note");
  return await res.json();
};
