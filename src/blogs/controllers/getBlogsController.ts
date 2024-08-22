import { Request, Response } from "express";
import { IBlogInputModel, IBlogViewModel } from "../types";
import { blogsRepository } from "../blogsRepository";

export const getBlogsController = async (
  req: Request<any, any, IBlogInputModel, { searchNameTerm?: string }>,
  res: Response<IBlogViewModel[]>,
) => {
  const blogs = await blogsRepository.getAllBlogs(
    req.query.searchNameTerm || "",
  );

  res.status(200).json(blogs);
};
