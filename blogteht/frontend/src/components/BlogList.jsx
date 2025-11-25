// Lists all blogs
const BlogList = ({ blogs }) => {
  if (!blogs || blogs.length === 0) return <p>No blogs available.</p>;

  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            {blog.title} by {blog.author} ({blog.likes} likes)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
