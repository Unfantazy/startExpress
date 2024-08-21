import { blogCollection } from "../db/mongo-db";
import { IBlogDbModel, IBlogInputModel } from "./types";
import { v4 as uuidv4 } from "uuid";

export const blogsRepository = {
  async createBlog(blog: IBlogInputModel) {
    const newBlog: IBlogDbModel = {
      ...blog,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      isMembership: false,
    };

    await blogCollection.insertOne(newBlog);

    const { _id, ...blogWithoutId } = newBlog;
    return blogWithoutId;
  },
  async getAllBlogs(): Promise<IBlogDbModel[]> {
    return blogCollection.find({}, { projection: { _id: 0 } }).toArray();
  },
  async getBlogById(id: string): Promise<IBlogDbModel | null> {
    return blogCollection.findOne({ id }, { projection: { _id: 0 } });
  },
  async updateBlog(id: string, blog: IBlogInputModel): Promise<boolean> {
    const { matchedCount } = await blogCollection.updateOne(
      { id },
      { $set: blog },
    );
    return matchedCount === 1;
  },
  async deleteBlog(id: string): Promise<boolean> {
    const { deletedCount } = await blogCollection.deleteOne({ id });
    return deletedCount === 1;
  },
};
