import { Request, Response } from "express";
import { postsRepository } from "../postsRepository";
import { IPostInputModel } from "../types";

export const updatePostController = async (
  req: Request<any, any, IPostInputModel>,
  res: Response<number>,
) => {
  const isUpdated = await postsRepository.updatePost(req.params.id, req.body);

  if (isUpdated) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
};
