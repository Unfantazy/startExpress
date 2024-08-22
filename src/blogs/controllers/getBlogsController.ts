import { Request, Response } from "express";
import { IBlogInputModel, IBlogViewModel } from "../types";
import { blogsRepository } from "../blogsRepository";
import { IItemsWithPagination } from "../../input-output-types/output-errors-type";

export const getBlogsController = async (
  req: Request<any, any, IBlogInputModel, { searchNameTerm?: string }>,
  res: Response<IItemsWithPagination<IBlogViewModel>>,
) => {
  const blogs = await blogsRepository.getAllBlogs(req.query);
  res.status(200).json(blogs);
};
