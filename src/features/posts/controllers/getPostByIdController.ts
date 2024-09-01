import { Request, Response } from "express";
import { postsRepository } from "../infrastructure/postsRepository";
import { IPostDbModel, IPostInputModel } from "../types";
import { HttpCodes } from "../../../common/httpCodes";

export const getPostByIdController = async (
  req: Request<any, any, IPostInputModel>,
  res: Response<IPostDbModel>,
) => {
  const post = await postsRepository.getPostById(req.params.id);
  if (post) {
    res.status(HttpCodes.Success).json(post);
    return;
  }

  res.sendStatus(HttpCodes.NotFound);
};
