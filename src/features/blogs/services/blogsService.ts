import { IBlogDbModel, IBlogInputModel } from "../types";
import { v4 as uuidv4 } from "uuid";
import { blogsRepository } from "../infrastructure/blogsRepository";

export const blogsService = {
  async createBlog(blog: IBlogInputModel) {
    const newBlog: IBlogDbModel = {
      ...blog,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      isMembership: false,
    };
    await blogsRepository.createBlog(newBlog);

    return newBlog.id
  },

};
