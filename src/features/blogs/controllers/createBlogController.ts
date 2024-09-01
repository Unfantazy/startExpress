import { Response, Request } from "express";
import { IBlogInputModel, IBlogViewModel } from "../types";
import { HttpCodes } from "../../../common/httpCodes";
import { blogsService } from "../services/blogsService";

export const createBlogController = async (
  req: Request<any, any, IBlogInputModel>,
  res: Response<IBlogViewModel>,
) => {
  const newBlog = await blogsService.createBlog(req.body);

  res.status(HttpCodes.Created).json(newBlog);
};
