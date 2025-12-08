import { useState, useEffect } from "react";
import "./Note.css";
import { Link } from "react-router-dom";
const Note = ({ note, user, toggleImportance, deleteNote }) => {
  const emojis = ["📝", "✨", "⚡", "💡", "📌", "❤️"];
  const [emoji, setEmoji] = useState(
    emojis[Math.floor(Math.random() * emojis.length)]
  );
  const [fade, setFade] = useState(true);
  const [wiggle, setWiggle] = useState(false);
  // Each note updates its own emoji every 3–7 seconds randomly
  useEffect(() => {
    const minInterval = 900; // 2s
    const maxInterval = 2000; // 7s

    const randomTime = () =>
      Math.floor(Math.random() * (maxInterval - minInterval)) + minInterval;
    const randomDuration = () => Math.floor(Math.random() * 400) + 200; // 0.2s to 0.6s

    const changeEmoji = () => {
      const duration = randomDuration();
      const style = document.getElementById(`emoji-${note.id}`)?.style;
      if (style) style.transition = `opacity ${duration}ms ease`;

      setFade(false); // fade out
      setTimeout(() => {
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        setEmoji(randomEmoji);
        setFade(true); // fade in
        setWiggle(true);
        setTimeout(() => setWiggle(false), 300); // wiggle lasts 0.3s
      }, duration);
    };

    const interval = setInterval(() => {
      changeEmoji();
    }, randomTime());

    return () => clearInterval(interval);
  }, [note.id]);

  const label = note.important ? "make not important" : "make important";
  const formattedDate = new Date(note.createdAt).toLocaleString();

  return (
    <li
      data-testid={`note-${note.id}`}
      className={`note-item ${note.important ? "important" : ""}`}
      style={{ position: "relative" }}
    >
      <Link
        to={`/notes/${note.id}`}
        className="note-link-overlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          textDecoration: "none",
          color: "inherit",
        }}
      />
      <div style={{ position: "relative", zIndex: 2 }}>
        <span
          id={`emoji-${note.id}`}
          className={`emoji ${fade ? "fade-in" : "fade-out"} ${
            wiggle ? "wiggle" : ""
          }`}
        >
          {emoji}
        </span>{" "}
        <span>{note.content}</span>
        <div className="note-meta">
          <small>
            by {note.user.name} at {formattedDate}
          </small>
        </div>
      </div>
      {user && (
        <div className="actions">
          {toggleImportance && (
            <button
              data-testid="toggle-btn"
              onClick={toggleImportance}
              className="toggle-btn"
            >
              {label}
            </button>
          )}
          {deleteNote && (
            <button
              data-testid="delete-btn"
              onClick={deleteNote}
              className="delete-btn"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </li>
  );
};

export default Note;
