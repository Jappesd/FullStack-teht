import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Note = ({ note, user, toggleImportance, deleteNote }) => {
  const emojis = ["📝", "✨", "⚡", "💡", "📌", "❤️"];
  const [emoji, setEmoji] = useState(
    emojis[Math.floor(Math.random() * emojis.length)]
  );
  const [fade, setFade] = useState(true);
  const [wiggle, setWiggle] = useState(false);

  // Change emoji at random intervals
  useEffect(() => {
    const minInterval = 900;
    const maxInterval = 2000;
    const randomTime = () =>
      Math.floor(Math.random() * (maxInterval - minInterval)) + minInterval;
    const randomDuration = () => Math.floor(Math.random() * 400) + 200;

    const changeEmoji = () => {
      const duration = randomDuration();
      const style = document.getElementById(`emoji-${note.id}`)?.style;
      if (style) style.transition = `opacity ${duration}ms ease`;

      setFade(false);
      setTimeout(() => {
        setEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
        setFade(true);
        setWiggle(true);
        setTimeout(() => setWiggle(false), 300);
      }, duration);
    };

    const interval = setInterval(changeEmoji, randomTime());
    return () => clearInterval(interval);
  }, [note.id]);

  const label = note.important ? "Make not important" : "Make important";
  const formattedDate = new Date(note.createdAt).toLocaleString();

  return (
    <div
      data-testid={`note-${note.id}`}
      className={`relative p-4 rounded-md mb-2 border ${
        note.important
          ? "border-red-500 bg-red-100"
          : "border-gray-300 bg-white"
      }`}
    >
      <div className="flex justify-between items-start gap-4">
        {/* Emoji */}
        <span
          id={`emoji-${note.id}`}
          className={`text-xl ${
            fade ? "opacity-100 transition-opacity duration-500" : "opacity-0"
          } ${wiggle ? "animate-wiggle" : ""}`}
        >
          {emoji}
        </span>

        {/* Note content */}
        <div className="flex-1">
          <Link
            to={`/notes/${note.id}`}
            className="text-gray-800 font-medium hover:underline"
          >
            {note.content}
          </Link>
          <div className="text-xs text-gray-500 mt-1">
            by {note.user.name} at {formattedDate}
          </div>
        </div>

        {/* Actions */}
        {user && (
          <div className="flex flex-col gap-2">
            {toggleImportance && (
              <button
                data-testid="toggle-btn"
                onClick={toggleImportance}
                className="px-2 py-1 bg-blue-500 text-white text-xs rounded border-none focus:outline-none hover:bg-blue-600"
              >
                {label}
              </button>
            )}
            {deleteNote && (
              <button
                data-testid="delete-btn"
                onClick={deleteNote}
                className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Note;
