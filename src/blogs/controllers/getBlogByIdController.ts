import { Request, Response } from "express";
import { IBlogInputModel, IBlogViewModel } from "../types";
import { blogsRepository } from "../blogsRepository";

export const getBlogByIdController = async (
  req: Request<any, any, IBlogInputModel>,
  res: Response<IBlogViewModel>,
) => {
  const blog = await blogsRepository.getBlogById(req.params.id);
  if (blog) {
    res.status(200).json(blog);
    return;
  }

  res.sendStatus(404);
};
