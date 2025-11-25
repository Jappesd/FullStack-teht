import { useState, useEffect } from "react";
import Blog from "./components/Blog.jsx";
import BlogForm from "./components/BlogForm.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Notification from "./components/Notification.jsx";
import blogService from "./services/blogService.js";
import loginService from "./services/loginService.js";

const App = () => {
  // State
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  // Local state for login form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Load user from localStorage on mount
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // Fetch blogs only when logged in
  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  // Notification helper
  const showNotification = (message, type = "success", duration = 2000) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: null, type: null }), duration);
  };

  // Login handler
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
      showNotification(`Welcome ${user.name}`, "success");
    } catch (err) {
      showNotification("Wrong credentials", "error", 3000);
    }
  };

  // Logout handler
  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogAppUser");
    showNotification("Logged out", "success");
  };

  // Add new blog
  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(newBlog));
      showNotification(`Blog added: "${newBlog.title}"`, "success", 2000);
    } catch (err) {
      showNotification("Failed to add blog", "error", 4000);
    }
  };

  return (
    <div>
      <h2>Blog App</h2>
      <Notification notification={notification} />

      {/* Landing page / login */}
      {!user && (
        <LoginForm
          setUser={setUser}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
          showNotification={showNotification}
        />
      )}

      {/* Logged-in view */}
      {user && (
        <>
          <p>
            {user.name} logged in <button onClick={handleLogout}>Logout</button>
          </p>

          <BlogForm addBlog={addBlog} />

          <h3>Blogs</h3>
          {blogs
            .sort((a, b) => b.likes - a.likes) // optional sorting
            .map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
        </>
      )}
    </div>
  );
};

export default App;
