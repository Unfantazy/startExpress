import { Request, Response } from "express";
import { IPostInputModel } from "../types";
import { postsRepository } from "../infrastructure/postsRepository";
import { HttpCodes } from "../../../common/httpCodes";

export const deletePostController = async (
  req: Request<any, any, IPostInputModel>,
  res: Response<any>,
) => {
  const isDeleted = await postsRepository.deletePost(req.params.id);

  if (isDeleted) {
    res.sendStatus(HttpCodes.NoContent);
    return;
  }

  res.sendStatus(HttpCodes.NotFound);
};
