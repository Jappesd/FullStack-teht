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

export default blogsRouter;
