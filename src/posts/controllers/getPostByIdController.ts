import { Request, Response } from "express";
import { postsRepository } from "../postsRepository";
import { IPostDbModel, IPostInputModel } from "../types";

export const getPostByIdController = async (
  req: Request<any, any, IPostInputModel>,
  res: Response<IPostDbModel>,
) => {
  const post = await postsRepository.getPostById(req.params.id);
  if (post) {
    res.status(200).json(post);
    return;
  }

  res.sendStatus(404);
};
