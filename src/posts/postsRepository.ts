import { postCollection } from "../db/mongo-db";
import { IPostDbModel, IPostInputModel } from "./types";
import { blogsRepository } from "../blogs/blogsRepository";
import { v4 as uuidv4 } from "uuid";

export const postsRepository = {
  async createPost(post: IPostInputModel) {
    const blog = await blogsRepository.getBlogById(post.blogId);
    if (!blog) return null;
    const newPost: IPostDbModel = {
      ...post,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      blogName: blog.name,
      blogId: blog.id,
    };

    await postCollection.insertOne(newPost);
    return newPost;
  },
  async getAllPosts(): Promise<IPostDbModel[]> {
    return postCollection.find({}).toArray();
  },
  async getPostById(id: string): Promise<IPostDbModel | null> {
    return postCollection.findOne({ id });
  },
  async updatePost(id: string, post: IPostInputModel): Promise<boolean> {
    const { matchedCount } = await postCollection.updateOne(
      { id },
      { $set: post },
    );
    return matchedCount === 1;
  },
  async deletePost(id: string): Promise<boolean> {
    const { deletedCount } = await postCollection.deleteOne({ id });
    return deletedCount === 1;
  },
};
