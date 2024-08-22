import { Response, Request } from "express";
import { blogsRepository } from "../blogsRepository";
import { postsRepository } from "../../posts/postsRepository";
import { IPostDbModel, IPostInputModel } from "../../posts/types";

export const createPostForCurrentBlogController = async (
  req: Request<any, any, IPostInputModel>,
  res: Response<IPostDbModel>,
) => {
  const blog = await blogsRepository.getBlogById(req.params.blogId);
  if (blog) {
    const newPost = await postsRepository.createPost(req.body, blog);
    res.status(201).json(newPost);
    return
  }

  res.sendStatus(404)
};
