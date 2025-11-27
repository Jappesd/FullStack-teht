import { useRef, useState, useEffect } from "react";
import LoginForm from "./components/LoginForm.jsx";
import Notification from "./components/Notification.jsx";
import blogService from "./services/blogService.js";
import loginService from "./services/loginService.js";
import BlogSection from "./components/BlogSection.jsx";
const App = () => {
  const blogFormRef = useRef();
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
  //like handler
  const handleLike = async (id) => {
    const blogToUpdate = blogs.find((b) => b.id === id);
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };

    // send only likes to the backend
    await blogService.update(id, { likes: updatedBlog.likes });

    // update state locally without touching the user field
    setBlogs(
      blogs.map((b) => (b.id === id ? { ...b, likes: updatedBlog.likes } : b))
    );
  };

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
  //deleterer
  const handleDelete = async (id) => {
    const blogToDelete = blogs.find((b) => b.id === id);
    if (!window.confirm(`Delete blog "${blogToDelete.title}"`)) return;
    try {
      await blogService.remove(id); //sends the request to delete with auth token
      //remove deleted blog from state
      setBlogs(blogs.filter((b) => b.id !== id));
      showNotification("Blog deleted successfully", "success", 2000);
    } catch (error) {
      console.log(error);
      showNotification("Error deleting post", "error", 3000);
    }
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
      console.log(err);
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
      blogFormRef.current.toggleVisibility();
    } catch (err) {
      console.log(err);
      showNotification("Failed to add blog", "error", 4000);
    }
  };

  return (
    <div className="app-container">
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
          <p className="user-bar">
            {user.name} logged in{" "}
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </p>
          {/*Blog section with toggleable new blog form*/}
          <BlogSection
            addBlog={addBlog}
            user={user}
            blogs={blogs}
            blogFormRef={blogFormRef}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
};

export default App;
