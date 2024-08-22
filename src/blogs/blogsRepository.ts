import { blogCollection } from "../db/mongo-db";
import {
  IBlogDbModel,
  IBlogInputModel,
  IBlogViewModel,
  QueryType,
} from "./types";
import { ObjectId } from "mongodb";
import { getDefaultQueryParams } from "../helpers";
import { IItemsWithPagination } from "../input-output-types/output-errors-type";

export const blogsRepository = {
  async createBlog(blog: IBlogInputModel) {
    const newBlog: IBlogDbModel = {
      ...blog,
      _id: new ObjectId(),
      createdAt: new Date().toISOString(),
      isMembership: false,
    };

    const mappedNewBlog = this.mapToOutput(newBlog);
    await blogCollection.insertOne(mappedNewBlog);
    return mappedNewBlog;
  },
  async getAllBlogs(
    query: QueryType,
  ): Promise<IItemsWithPagination<IBlogViewModel>> {
    const { searchNameTerm, sortDirection, sortBy, pageNumber, pageSize } =
      getDefaultQueryParams(query);

    const search = searchNameTerm
      ? { name: { $regex: searchNameTerm, $options: "i" } }
      : {};

    const filter = {
      ...search,
    };

    const totalCount = await blogCollection.countDocuments(filter);

    const items = (await blogCollection
      .find(filter)
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip((+pageNumber - 1) * +pageSize)
      .limit(+pageSize)
      .toArray()) as IBlogDbModel[];

    return {
      pagesCount: Math.ceil(totalCount / pageSize),
      page: pageNumber,
      pageSize: pageSize,
      totalCount,
      items: items.map(this.mapToOutput),
    };
  },
  async getBlogById(id: string): Promise<IBlogViewModel | null> {
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

  mapToOutput(blog: IBlogDbModel): IBlogViewModel {
    const { _id, ...restBlog } = blog;
    return {
      ...restBlog,
      id: _id.toString(),
    };
  },
};
