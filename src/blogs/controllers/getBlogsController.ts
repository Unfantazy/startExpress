import { Request, Response } from "express";
import { IBlogInputModel, IBlogViewModel } from "../types";
import { blogsRepository } from "../blogsRepository";

export const getBlogsController = async (
  req: Request<any, any, IBlogInputModel>,
  res: Response<IBlogViewModel[]>,
) => {
  const blogs = await blogsRepository.getAllBlogs();

  res.status(200).json(blogs);
};
