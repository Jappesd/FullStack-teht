import { useState } from "react";
import { login } from "../services/login.js";
import noteService from "../services/notes.js";
import logger from "../../utils/logger.js";
const LoginForm = ({ setUser, setNotification }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await login({
        username: username.trim(),
        password: password.trim(),
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      noteService.setToken(user.token);
      setUser(user);
      setNotification({ message: `Welcome ${user.name}!`, type: "success" });
      setTimeout(() => setNotification({ message: null, type: null }), 5000);
      setUserName("");
      setPassword("");
    } catch (error) {
      setNotification({ message: "Invalid credentials", type: "error" });
      setTimeout(() => setNotification({ message: null, type: null }), 5000);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="login-input"
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              className="login-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button className="login-btn" type="submit">
          login
        </button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default LoginForm;
