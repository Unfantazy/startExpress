import { Response, Request } from "express";
import { postsRepository } from "../../posts/postsRepository";
import { IPostInputModel, IPostViewModel } from "../../posts/types";
import { IItemsWithPagination } from "../../input-output-types/output-errors-type";
import { blogsQueryRepository } from "../blogsQueryRepository";

export const getPostsForCurrentBlogController = async (
  req: Request<any, any, IPostInputModel>,
  res: Response<IItemsWithPagination<IPostViewModel>>,
) => {
  const blog = await blogsQueryRepository.getBlogById(req.params.blogId);
  if (!blog) {
    res.sendStatus(404);
    return;
  }

  const postsForBlog = await postsRepository.getAllPostsForCurrentBlog(
    blog.id,
    req.query,
  );
  res.status(200).json(postsForBlog);
};
