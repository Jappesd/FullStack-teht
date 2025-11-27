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
        Username:{' '}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        Password:{' '}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
