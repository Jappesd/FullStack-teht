import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService.js";
import { useNotification } from "../context/NotificationContext.jsx";
import { useUser } from "../context/UserContext.jsx";
const UserForm = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useUser();
  const { showNotification } = useNotification();
  useEffect(() => {
    if (user) {
      navigate("/notes", { replace: true });
    }
  }, [user, navigate]);
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const newUser = { username, name: fullName, password };
      const createdUser = await userService.create(newUser);

      showNotification(`User ${createdUser.username} created!`);
      setUserName("");
      setFullName("");
      setPassword("");
    } catch (error) {
      showNotification(
        error.response?.data?.error || "error creating user",
        "error"
      );
    }
  };
  return (
    <div>
      <h2>Create New User</h2>
      <form onSubmit={handleCreateUser}>
        <div>
          <label>Username </label>
          <input
            data-testid="newuser-username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label>Name </label>
          <input
            data-testid="newuser-fullname"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>Password </label>
          <input
            data-testid="newuser-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="filter-btn"
          data-testid="newuser-submit"
          type="submit"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default UserForm;
