import { Request, Response } from "express";
import { IBlogInputModel, IBlogViewModel } from "../types";
import { blogsQueryRepository } from "../infrastructure/blogsQueryRepository";
import { HttpCodes } from "../../../common/httpCodes";

export const getBlogByIdController = async (
  req: Request<any, any, IBlogInputModel>,
  res: Response<IBlogViewModel>,
) => {
  const blog = await blogsQueryRepository.getBlogById(req.params.id);
  if (blog) {
    res.status(HttpCodes.Success).json(blog);
    return;
  }

  res.sendStatus(HttpCodes.NotFound);
};
