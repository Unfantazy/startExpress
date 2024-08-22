import { Request, Response } from "express";
import { postsRepository } from "../postsRepository";
import { IPostInputModel, IPostViewModel } from "../types";
import { IItemsWithPagination } from "../../input-output-types/output-errors-type";

export const getPostsController = async (
  req: Request<any, any, IPostInputModel>,
  res: Response<IItemsWithPagination<IPostViewModel>>,
) => {
  const posts = await postsRepository.getAllPosts(req.query);

  res.status(200).json(posts);
};
