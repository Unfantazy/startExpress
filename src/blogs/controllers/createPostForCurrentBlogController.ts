import { Response, Request } from "express";
import { postsRepository } from "../../posts/postsRepository";
import { IPostInputModel, IPostViewModel } from "../../posts/types";

export const createPostForCurrentBlogController = async (
  req: Request<any, any, IPostInputModel>,
  res: Response<IPostViewModel>,
) => {
  const newPost = await postsRepository.createPost(req.body, req.params.blogId);

  if (newPost) {
    res.status(201).json(newPost);
    return;
  }

  res.sendStatus(404);
};
