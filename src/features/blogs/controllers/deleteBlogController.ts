import { Request, Response } from "express";
import { IBlogInputModel } from "../types";
import { blogsRepository } from "../infrastructure/blogsRepository";
import { HttpCodes } from "../../../common/httpCodes";

export const deleteBlogController = async (
  req: Request<any, any, IBlogInputModel>,
  res: Response<any>,
) => {
  debugger;
  const isDeleted = await blogsRepository.deleteBlog(req.params.id);

  if (isDeleted) {
    res.sendStatus(HttpCodes.NoContent);
    return;
  }

  res.sendStatus(HttpCodes.NotFound);
};
