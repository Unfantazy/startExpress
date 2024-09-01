import { Router } from "express";
import { getBlogsController } from "./controllers/getBlogsController";
import { createBlogController } from "./controllers/createBlogController";
import { getBlogByIdController } from "./controllers/getBlogByIdController";
import { updateBlogController } from "./controllers/updateBlogController";
import { deleteBlogController } from "./controllers/deleteBlogController";
import { blogValidators } from "./middlewares/blogValidators";
import { adminMiddleware } from "../../global-middlewares/admin-middleware";
import { createPostForCurrentBlogController } from "./controllers/createPostForCurrentBlogController";
import { postValidatorForBlog } from "../posts/middlewares/postValidators";
import { getPostsForCurrentBlogController } from "./controllers/getPostsForCurrentBlogController";

export const blogsRouter = Router();

blogsRouter
  .get("/", getBlogsController)
  .post("/", ...blogValidators, createBlogController)
  .get("/:id", getBlogByIdController)
  .put("/:id", ...blogValidators, updateBlogController)
  .delete("/:id", adminMiddleware, deleteBlogController)

  .post(
    "/:blogId/posts",
    ...postValidatorForBlog,
    createPostForCurrentBlogController,
  )
  .get("/:blogId/posts", getPostsForCurrentBlogController);
