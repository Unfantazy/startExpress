import { Request, Response } from "express";
import { postsRepository } from "../infrastructure/postsRepository";
import { IPostInputModel } from "../types";
import { HttpCodes } from "../../../common/httpCodes";

export const updatePostController = async (
  req: Request<any, any, IPostInputModel>,
  res: Response<number>,
) => {
  const isUpdated = await postsRepository.updatePost(req.params.id, req.body);

  if (isUpdated) {
    res.sendStatus(HttpCodes.NoContent);
  } else {
    res.sendStatus(HttpCodes.NotFound);
  }
};
