import { blogCollection } from "../../../db/mongo-db";
import { IBlogDbModel, IBlogInputModel } from "../types";

export const blogsRepository = {
  async createBlog(blog: IBlogDbModel) {
    const { insertedId } = await blogCollection.insertOne(blog);
    return insertedId;
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
