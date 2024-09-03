import { IItemsWithPagination } from "../../../input-output-types/output-errors-type";
import { userCollection } from "../../../db/mongo-db";
import {
  IUserDbModel,
  IUserViewModel,
  UserPreparedQueryType,
} from "../types/userTypes";
import { getPaginatedResults } from "../../../common/paginate";
import { ObjectId } from "mongodb";

export const usersQueryRepository = {
  async getAllUsers(
    query: UserPreparedQueryType,
  ): Promise<IItemsWithPagination<IUserViewModel>> {
    const {
      searchLoginTerm,
      searchEmailTerm,
      sortDirection,
      sortBy,
      pageNumber,
      pageSize,
    } = query;

    const searchFilter = this._buildSearchFilter(
      searchLoginTerm,
      searchEmailTerm,
    );

    const filter = {
      ...searchFilter,
    };

    return await getPaginatedResults(
      userCollection,
      filter,
      pageNumber,
      pageSize,
      sortBy,
      sortDirection,
      this._mapToOutput,
    );
  },

  async getUserById(id: string): Promise<IUserViewModel> {
    return this._mapToOutput(
      await userCollection.findOne({ _id: new ObjectId(id) }),
    );
  },

  _mapToOutput(user: IUserDbModel): IUserViewModel {
    const { _id, password, ...rest } = user;
    return {
      id: _id!.toString(),
      ...rest,
    };
  },

  _buildSearchFilter(searchLoginTerm?: string, searchEmailTerm?: string) {
    const orConditions = [];
    if (searchLoginTerm) {
      orConditions.push({
        login: { $regex: `.*${searchLoginTerm}.*`, $options: "i" },
      });
    }
    if (searchEmailTerm) {
      orConditions.push({
        email: { $regex: `.*${searchEmailTerm}.*`, $options: "i" },
      });
    }
    return orConditions.length > 0 ? { $or: orConditions } : {};
  },
};
