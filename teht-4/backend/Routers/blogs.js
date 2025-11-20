import { Router } from "express";
import { Blog, User } from "../connections/Schema.js";

const blogsRouter = Router();

// get all blogs
blogsRouter.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate("user", { username: 1 });
    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

// find by id
blogsRouter.get("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    blog ? res.json(blog) : res.status(404).end();
  } catch (err) {
    next(err);
  }
});
//post new blog
blogsRouter.post("/", async (req, res, next) => {
  try {
    const { title, author, url, likes, userId } = req.body;

    if (!title || !url) {
      return res.status(400).json({ error: "title and url are required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        error: "invalid user ID",
      });
    }
    const blog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user: user._id,
    });
    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    const populatedBlog = await savedBlog.populate("user", { username: 1 });
    res.status(201).json(populatedBlog);
  } catch (err) {
    next(err);
  }
});
//updates existing blog by id
blogsRouter.put("/:id", async (req, res, next) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      context: "query",
    });

    if (!updated) {
      return res.status(404).end();
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
});
// delete a blog by id
blogsRouter.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).end();
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default blogsRouter;
