// src/components/LoginForm.jsx
import { useState } from "react";
import loginService from "../services/loginService.js";

const LoginForm = ({ setUser, showNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      if (!user || !user.token) {
        // Just in case backend responds incorrectly
        showNotification("Invalid credentials", "error");
        return;
      }

      setUser(user);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      showNotification("Login successful!", "success");

      setUsername("");
      setPassword("");
    } catch (err) {
      console.log(err);
      // This only triggers if axios throws an error (network, 500, etc.)
      showNotification("Invalid credentials", "error");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        Username:{" "}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        Password:{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
