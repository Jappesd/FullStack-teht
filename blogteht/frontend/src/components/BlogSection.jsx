import { useState } from "react";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";

const BlogSection = ({
  handleDelete,
  handleLike,
  addBlog,
  user,
  blogs,
  blogFormRef,
}) => {
  // Store visibility for each blog by id
  const [visibleBlogs, setVisibleBlogs] = useState({});

  const toggleVisible = (id) => {
    setVisibleBlogs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      {user && (
        <Togglable
          ref={blogFormRef}
          buttonTestId="newblog-btn"
          buttonLabel="Create New Blog"
        >
          <BlogForm addBlog={addBlog} />
        </Togglable>
      )}

      <h2>Blogs</h2>
      <ul className="blog-list">
        {blogs
          .slice()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li
              data-testid={`blog-${blog.id}`}
              key={blog.id}
              className={`blog-item ${
                visibleBlogs[blog.id] ? "show-details" : ""
              }`}
            >
              <span>
                {blog.title} by {blog.author}
              </span>
              <button
                data-testid={`view-btn-${blog.id}`}
                className="view-btn"
                onClick={() => toggleVisible(blog.id)}
              >
                {visibleBlogs[blog.id] ? "Hide" : "View"}
              </button>

              {visibleBlogs[blog.id] && (
                <div className="blog-details">
                  <p>Title: {blog.title}</p>
                  <p>Author: {blog.author}</p>
                  {blog.url && <p>URL: {blog.url}</p>}
                  <p>
                    Likes: {blog.likes}{" "}
                    <button
                      data-testid={`like-btn-${blog.id}`}
                      className="like-btn"
                      onClick={() => handleLike(blog.id)}
                    >
                      Like
                    </button>
                  </p>
                  {blog.user.username === user.username && (
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(blog.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BlogSection;
