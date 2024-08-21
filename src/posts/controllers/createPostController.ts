import { Response, Request } from "express";
import { postsRepository } from "../postsRepository";
import { IPostDbModel, IPostInputModel } from "../types";

export const createPostController = async (
  req: Request<any, any, IPostInputModel>,
  res: Response<IPostDbModel>,
) => {
  const newPost = await postsRepository.createPost(req.body);

  if (newPost) {
    res.status(201).json(newPost);
    return;
  }

  res.sendStatus(404);
};
