import axios from "axios";
const baseUrl = "/api/users";

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (user) => {
  const res = await axios.post(baseUrl, user);
  return res.data;
};

export default { getAll, create };
