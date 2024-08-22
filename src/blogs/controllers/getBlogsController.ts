import { Request, Response } from "express";
import { IBlogInputModel, IBlogWithPagination } from "../types";
import { blogsRepository } from "../blogsRepository";

export const getBlogsController = async (
  req: Request<any, any, IBlogInputModel, { searchNameTerm?: string }>,
  res: Response<IBlogWithPagination>,
) => {
  const blogs = await blogsRepository.getAllBlogs(req.query);
  res.status(200).json(blogs);
};
