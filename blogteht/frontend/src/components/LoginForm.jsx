// src/components/LoginForm.jsx

const LoginForm = ({
  username,
  password,
  setPassword,
  setUsername,
  handleLogin,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        Username:{" "}
        <input
          data-testid="login-user"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        Password:{" "}
        <input
          data-testid="login-pass"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button data-testid="login-btn" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
