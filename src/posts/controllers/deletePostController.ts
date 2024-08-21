import { Request, Response } from "express";
import { IPostInputModel } from "../types";
import { postsRepository } from "../postsRepository";

export const deletePostController = async (
  req: Request<any, any, IPostInputModel>,
  res: Response<any>,
) => {
  const isDeleted = await postsRepository.deletePost(req.params.id);

  if (isDeleted) {
    res.sendStatus(204);
    return;
  }

  res.sendStatus(404);
};
