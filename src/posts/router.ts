import { Router } from "express";
import { getPostsController } from "./controllers/getPostsController";
import { getPostByIdController } from "./controllers/getPostByIdController";
import { updatePostController } from "./controllers/updatePostController";
import { deletePostController } from "./controllers/deletePostController";
import { adminMiddleware } from "../global-middlewares/admin-middleware";
import { createPostController } from "./controllers/createPostController";
import {postValidator} from "./middlewares/postValidators";

export const postsRouter = Router();

postsRouter
  .get("/", getPostsController)
  .post("/", ...postValidator, createPostController)
  .get("/:id", getPostByIdController)
  .put("/:id", ...postValidator, updatePostController)
  .delete("/:id", adminMiddleware, deletePostController);
