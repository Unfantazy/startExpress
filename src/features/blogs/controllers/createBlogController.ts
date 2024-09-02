import { Response, Request } from "express";
import { IBlogInputModel, IBlogViewModel } from "../types";
import { HttpCodes } from "../../../common/httpCodes";
import { blogsService } from "../services/blogsService";
import { blogsQueryRepository } from "../infrastructure/blogsQueryRepository";

export const createBlogController = async (
  req: Request<any, any, IBlogInputModel>,
  res: Response<IBlogViewModel>,
) => {
  const id = await blogsService.createBlog(req.body);
  const blog = await blogsQueryRepository.getBlogById(id);

  if (blog) {
    res.status(HttpCodes.Created).json(blog);
    return;
  }

  res.sendStatus(HttpCodes.NotFound);
};
