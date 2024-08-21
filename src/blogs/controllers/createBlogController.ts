import { Response, Request } from "express";
import { IBlogInputModel, IBlogViewModel } from "../types";
import { blogsRepository } from "../blogsRepository";

export const createBlogController = async (
  req: Request<any, any, IBlogInputModel>,
  res: Response<IBlogViewModel>,
) => {
  const newBlog = await blogsRepository.createBlog(req.body);

  res.status(201).json(newBlog);
};
