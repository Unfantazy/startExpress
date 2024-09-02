import { IBlogDbModel, IBlogViewModel, QueryType } from "../types";
import { IItemsWithPagination } from "../../../input-output-types/output-errors-type";
import { getDefaultQueryParams } from "../helpers";
import { blogCollection } from "../../../db/mongo-db";

export const blogsQueryRepository = {
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
      items: items.map(this._mapToOutput),
    };
  },

  async getBlogById(id: string): Promise<IBlogViewModel | null> {
    return blogCollection.findOne({ id }, { projection: { _id: 0 } });
  },

  _mapToOutput(blog: IBlogDbModel): IBlogViewModel {
    const { _id, ...restBlog } = blog;
    return {
      ...restBlog,
    };
  },
};
