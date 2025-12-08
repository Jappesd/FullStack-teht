import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NotesPage from "./pages/NotesPage";
import CreateUserPage from "./pages/CreateUserPage";
import LoginPage from "./pages/LoginPage";
import SingleNotePage from "./pages/SingleNotePage";
import { useState } from "react";
import { useUser } from "./context/UserContext";
import Footer from "./components/Footer";
import MessageNotification from "./components/MessageNotification";
import { useNotification } from "./context/NotificationContext";
const App = () => {
  const style = {
    "text-decoration": "none",
  };
  const { notification } = useNotification();
  const { user } = useUser();
  return (
    <Router>
      <div className="app-container">
        {/* Notification */}
        <MessageNotification notification={notification} />
        {!user && (
          <nav className="actions-bar">
            <Link style={style} className="filter-btn" to="/notes">
              Notes
            </Link>

            <Link style={style} className="filter-btn" to="/create-user">
              Create User
            </Link>

            <Link style={style} className="filter-btn" to="/login">
              Login
            </Link>
          </nav>
        )}

        <Routes>
          <Route path="/" element={<NotesPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/notes/:id" element={<SingleNotePage />} />
          <Route path="/create-user" element={<CreateUserPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};
export default App;
