import { Router } from "express";
import { getBlogsController } from "./controllers/getBlogsController";
import { createBlogController } from "./controllers/createBlogController";
import { getBlogByIdController } from "./controllers/getBlogByIdController";
import { updateBlogController } from "./controllers/updateBlogController";
import { deleteBlogController } from "./controllers/deleteBlogController";
import { blogValidators } from "./middlewares/blogValidators";
import { adminMiddleware } from "../global-middlewares/admin-middleware";

export const blogsRouter = Router();

blogsRouter
  .get("/", getBlogsController)
  .post("/", ...blogValidators, createBlogController)
  .get("/:id", getBlogByIdController)
  .put("/:id", ...blogValidators, updateBlogController)
  .delete("/:id", adminMiddleware, deleteBlogController);
