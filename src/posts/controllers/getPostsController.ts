import { Request, Response } from "express";
import { postsRepository } from "../postsRepository";
import { IPostDbModel, IPostInputModel } from "../types";

export const getPostsController = async (
  req: Request<any, any, IPostInputModel>,
  res: Response<IPostDbModel[]>,
) => {
  const posts = await postsRepository.getAllPosts();

  res.status(200).json(posts);
};
