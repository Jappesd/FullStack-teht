import { useState } from "react";
import userService from "../services/userService.js";

const UserForm = () => {
  const [username, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const newUser = { username, name: fullName, password };
      const createdUser = await userService.create(newUser);

      setMessage(`User ${createdUser.username} created!`);
      setUserName("");
      setFullName("");
      setPassword("");
    } catch (error) {
      setMessage(error.response?.data?.error || "error creating user");
    }
    setTimeout(() => setMessage(null), 5000);
  };
  return (
    <div>
      <h2>Create New User</h2>
      {message && <div>{message}</div>}
      <form onSubmit={handleCreateUser}>
        <div>
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label>Name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default UserForm;
