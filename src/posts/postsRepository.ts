import { postCollection } from "../db/mongo-db";
import { IPostDbModel, IPostInputModel } from "./types";
import { v4 as uuidv4 } from "uuid";
import {IBlogDbModel} from "../blogs/types";

export const postsRepository = {
  async createPost(post: IPostInputModel, blog: IBlogDbModel) {
    const newPost: IPostDbModel = {
      ...post,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      blogName: blog.name,
      blogId: blog.id,
    };

    await postCollection.insertOne(newPost);
    const { _id, ...postWithoutId } = newPost;
    return postWithoutId;
  },
  async getAllPosts(): Promise<IPostDbModel[]> {
    return postCollection.find({}, { projection: { _id: 0 } }).toArray();
  },
  async getPostById(id: string): Promise<IPostDbModel | null> {
    return postCollection.findOne({ id }, { projection: { _id: 0 } });
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
