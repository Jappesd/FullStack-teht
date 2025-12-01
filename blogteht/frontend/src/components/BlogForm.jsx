//Form to add a new blog
import { useState } from "react";

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    addBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div className="blog-form">
      <h3>Add a new blog</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            data-testid="blog-title"
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            data-testid="blog-author"
            type="text"
            value={author}
            placeholder="Author"
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            data-testid="blog-url"
            type="text"
            value={url}
            placeholder="URL (optional)"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button data-testid="submit-btn" type="submit">
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
