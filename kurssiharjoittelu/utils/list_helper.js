export const dummy = (blogs) => {
  return 1;
};

export const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

export const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  return blogs.reduce((favorite, blog) => {
    return favorite.likes > blog.likes ? favorite : blog;
  });
};

export const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  const count = {};

  blogs.forEach((blog) => {
    count[blog.author] = (count[blog.author] || 0) + 1;
  });

  let maxBlogs = 0;
  let maxAuthor = "";
  for (const author in count) {
    if (count[author] > maxBlogs) {
      maxBlogs = count[author];
      maxAuthor = author;
    }
  }
  return {
    author: maxAuthor,
    blogs: maxBlogs,
  };
};

export const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;
  const likeCount = {};

  blogs.forEach((blog) => {
    likeCount[blog.author] = (likeCount[blog.author] || 0) + blog.likes;
  });

  let maxLikes = 0;
  let maxAuthor = "";

  for (const author in likeCount) {
    if (likeCount[author] > maxLikes) {
      maxLikes = likeCount[author];
      maxAuthor = author;
    }
  }
  return {
    author: maxAuthor,
    likes: maxLikes,
  };
};
