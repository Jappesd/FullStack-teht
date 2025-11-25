//displays single blog
const Blog = ({ blog }) => {
  return (
    <div className="blog">
      <strong>{blog.title}</strong> by {blog.author}
      {blog.url && (
        <div>
          <a href={blog.url} target="_blank" rel="noreferrer">
            {blog.url}
          </a>
        </div>
      )}
    </div>
  );
};

export default Blog;
