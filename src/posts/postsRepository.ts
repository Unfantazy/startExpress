import { postCollection } from "../db/mongo-db";
import { IPostDbModel, IPostInputModel, IPostViewModel } from "./types";
import { QueryType } from "../blogs/types";
import { getDefaultQueryParams } from "../helpers";
import { IItemsWithPagination } from "../input-output-types/output-errors-type";
import { blogsRepository } from "../blogs/blogsRepository";
import { v4 as uuidv4 } from "uuid";

export const postsRepository = {
  async createPost(post: IPostInputModel, blogId: string) {
    const blog = await blogsRepository.getBlogById(blogId);
    if (!blog) {
      return null;
    }
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
  async getAllPosts(
    query: QueryType,
  ): Promise<IItemsWithPagination<IPostViewModel>> {
    const defaultQueryParams = getDefaultQueryParams(query);
    const { pageSize, pageNumber, sortBy, sortDirection } = defaultQueryParams;

    const totalCount = await postCollection.countDocuments({});

    const items = await postCollection
      .find({})
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip((+pageNumber - 1) * +pageSize)
      .limit(+pageSize)
      .toArray();

    return {
      pagesCount: Math.ceil(totalCount / pageSize),
      page: pageNumber,
      pageSize: pageSize,
      totalCount,
      items,
    };
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

  async getAllPostsForCurrentBlog(blogId: string): Promise<IPostDbModel[]> {
    return postCollection
      .find({ blogId }, { projection: { _id: 0 } })
      .toArray();
  },

  mapToOutput(post: IPostDbModel): IPostViewModel {
    const { _id, ...restPost } = post;
    return {
      ...restPost,
    };
  },
};
