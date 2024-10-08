import { Request, Response } from "express";
import { IBlogInputModel, IBlogViewModel } from "../types";
import { IItemsWithPagination } from "../../../input-output-types/output-errors-type";
import { blogsQueryRepository } from "../infrastructure/blogsQueryRepository";
import { HttpCodes } from "../../../common/httpCodes";

export const getBlogsController = async (
  req: Request<any, any, IBlogInputModel, { searchNameTerm?: string }>,
  res: Response<IItemsWithPagination<IBlogViewModel>>,
) => {
  const blogs = await blogsQueryRepository.getAllBlogs(req.query);
  res.status(HttpCodes.Success).json(blogs);
};
