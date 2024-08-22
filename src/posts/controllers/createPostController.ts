import { Response, Request } from "express";
import { postsRepository } from "../postsRepository";
import { IPostInputModel, IPostViewModel } from "../types";

export const createPostController = async (
  req: Request<any, any, IPostInputModel>,
  res: Response<IPostViewModel>,
) => {
  const newPost = await postsRepository.createPost(req.body, req.body.blogId);

  if (newPost) {
    res.status(201).json(newPost);
    return;
  }

  res.sendStatus(404);
};
