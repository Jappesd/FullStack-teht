//axios calls for blogs (GET,POST,DELETE)
import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

//set token for auth requests
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

//GET all blogs
const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

//POST a new blog
const create = async (blogObject) => {
  const config = { headers: { Authorization: token } };
  const res = await axios.post(baseUrl, blogObject, config);
  return res.data;
};

//DELETE a blog (not yet implemented in frontend)
const remove = async (id) => {
  const config = { headers: { Authorization: token } };
  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res.data;
};

// Optional: PUT/PATCH to update likes
const update = async (id, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog);
  return response.data;
};

export default { getAll, create, remove, update, setToken };
