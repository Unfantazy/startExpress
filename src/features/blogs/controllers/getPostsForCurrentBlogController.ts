import { Response, Request } from "express";
import { postsRepository } from "../../posts/infrastructure/postsRepository";
import { IPostInputModel, IPostViewModel } from "../../posts/types";
import { IItemsWithPagination } from "../../../input-output-types/output-errors-type";
import { blogsQueryRepository } from "../infrastructure/blogsQueryRepository";
import { HttpCodes } from "../../../common/httpCodes";

export const getPostsForCurrentBlogController = async (
  req: Request<any, any, IPostInputModel>,
  res: Response<IItemsWithPagination<IPostViewModel>>,
) => {
  const blog = await blogsQueryRepository.getBlogById(req.params.blogId);
  if (!blog) {
    res.sendStatus(HttpCodes.NotFound);
    return;
  }

  const postsForBlog = await postsRepository.getAllPostsForCurrentBlog(
    blog.id,
    req.query,
  );
  res.status(HttpCodes.Success).json(postsForBlog);
};
