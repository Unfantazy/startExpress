import { Response, Request } from "express";
import { blogsRepository } from "../blogsRepository";
import { postsRepository } from "../../posts/postsRepository";
import { IPostDbModel, IPostInputModel } from "../../posts/types";

export const getPostsForCurrentBlogController = async (
  req: Request<any, any, IPostInputModel>,
  res: Response<IPostDbModel[]>,
) => {
  const blog = await blogsRepository.getBlogById(req.params.blogId);
  if (!blog) {
    res.sendStatus(404);
    return;
  }

  const postsForBlog = await postsRepository.getAllPostsForCurrentBlog(blog.id);
  res.status(200).json(postsForBlog);
};
