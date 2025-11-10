import axios from "axios";
const baseUrl =
  import.meta.env.VITE_BASE_URL || "http://localhost:3001/api/notes";
//const baseUrl = "/api/notes"

const getAll = () => {
  return axios.get(baseUrl);
};
const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const update = async (id, newObject) => {
  const res = await axios.put(`${baseUrl}/${id}`, newObject);
  return res.data;
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, update, remove };
