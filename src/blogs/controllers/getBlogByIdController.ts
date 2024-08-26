import { Request, Response } from "express";
import { IBlogInputModel, IBlogViewModel } from "../types";
import { blogsQueryRepository } from "../blogsQueryRepository";

export const getBlogByIdController = async (
  req: Request<any, any, IBlogInputModel>,
  res: Response<IBlogViewModel>,
) => {
  const blog = await blogsQueryRepository.getBlogById(req.params.id);
  if (blog) {
    res.status(200).json(blog);
    return;
  }

  res.sendStatus(404);
};
