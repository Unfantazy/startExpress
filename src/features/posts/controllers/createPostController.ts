import { Response, Request } from "express";
import { postsRepository } from "../infrastructure/postsRepository";
import { IPostInputModel, IPostViewModel } from "../types";
import { HttpCodes } from "../../../common/httpCodes";

export const createPostController = async (
  req: Request<any, any, IPostInputModel>,
  res: Response<IPostViewModel>,
) => {
  const newPost = await postsRepository.createPost(req.body, req.body.blogId);

  if (newPost) {
    res.status(HttpCodes.Created).json(newPost);
    return;
  }

  res.sendStatus(HttpCodes.NotFound);
};
