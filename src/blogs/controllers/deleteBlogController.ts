import { Request, Response } from "express";
import { IBlogInputModel } from "../types";
import { blogsRepository } from "../blogsRepository";

export const deleteBlogController = async (
  req: Request<any, any, IBlogInputModel>,
  res: Response<any>,
) => {
  debugger;
  const isDeleted = await blogsRepository.deleteBlog(req.params.id);

  if (isDeleted) {
    res.sendStatus(204);
    return;
  }

  res.sendStatus(404);
};
