import { useState } from "react";
import { login } from "../services/login.js";
import noteService from "../services/notes.js";
import { TextField, Button } from "@mui/material";
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
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          data-testid="login-username"
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
      </div>
      <div>
        <TextField
          data-testid="login-password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
      </div>
      <Button
        data-testid="login-submit"
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        login
      </Button>
    </form>
  );
};

export default LoginForm;
