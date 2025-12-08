import { useState } from "react";
import { login } from "../services/login.js";
import noteService from "../services/notes.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useNotification } from "../context/NotificationContext.jsx";
import { useUser } from "../context/UserContext.jsx";
const LoginForm = ({ setUser }) => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, user } = useUser();
  const { showNotification, notification } = useNotification();
  useEffect(() => {
    if (user) {
      navigate("/notes", { replace: true });
    }
  }, [user, navigate]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await login({
        username: username.trim(),
        password: password.trim(),
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      noteService.setToken(user.token);
      loginUser(user);
      showNotification(`Welcome ${user.name}!`, "success");
      setUserName("");
      setPassword("");
      navigate("/notes", { replace: true });
    } catch (error) {
      showNotification("Invalid credentials", "error");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            username
            <input
              data-testid="login-username"
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
              data-testid="login-password"
              className="login-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button data-testid="login-submit" className="login-btn" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
