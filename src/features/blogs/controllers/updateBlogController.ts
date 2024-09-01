import { Request, Response } from "express";
import { IBlogInputModel } from "../types";
import { blogsRepository } from "../infrastructure/blogsRepository";
import { HttpCodes } from "../../../common/httpCodes";

export const updateBlogController = async (
  req: Request<any, any, IBlogInputModel>,
  res: Response<number>,
) => {
  const isUpdated = await blogsRepository.updateBlog(req.params.id, req.body);

  if (isUpdated) {
    res.sendStatus(HttpCodes.NoContent);
  } else {
    res.sendStatus(HttpCodes.NotFound);
  }
};
