import { Router } from "express";
import { Blog } from "../connections/Schema.js";

const blogsRouter = Router();

// get all blogs
blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
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
  const { title, author, url, likes } = req.body;
  const blog = new Blog({ title, author, url, likes });
  try {
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
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
