import { Response, Request } from "express";
import { postsRepository } from "../../posts/infrastructure/postsRepository";
import { IPostInputModel, IPostViewModel } from "../../posts/types";
import { HttpCodes } from "../../../common/httpCodes";

export const createPostForCurrentBlogController = async (
  req: Request<any, any, IPostInputModel>,
  res: Response<IPostViewModel>,
) => {
  const newPost = await postsRepository.createPost(req.body, req.params.blogId);

  if (newPost) {
    res.status(HttpCodes.Created).json(newPost);
    return;
  }

  res.sendStatus(HttpCodes.NotFound);
};
