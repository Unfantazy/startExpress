import { Request, Response } from "express";
import { IBlogInputModel } from "../types";
import { blogsRepository } from "../blogsRepository";

export const updateBlogController = async (
  req: Request<any, any, IBlogInputModel>,
  res: Response<number>,
) => {
  const isUpdated = await blogsRepository.updateBlog(req.params.id, req.body);

  if (isUpdated) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
};
