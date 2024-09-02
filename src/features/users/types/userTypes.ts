import { ObjectId, SortDirection } from "mongodb";

export type UserPreparedQueryType = {
  sortBy: string;
  sortDirection: SortDirection;
  pageNumber: number;
  pageSize: number;
  searchLoginTerm?: string;
  searchEmailTerm?: string;
};

export type UserQueryType = {
  sortBy?: string;
  sortDirection?: SortDirection;
  pageNumber?: string;
  pageSize?: string;
  searchLoginTerm?: string;
  searchEmailTerm?: string;
};

export type IUserViewModel = {
  id: string;
  login: string;
  email: string;
  createdAt: string;
};

export type IUserDbModel = {
  _id?: ObjectId;
  login: string;
  email: string;
  createdAt: string;
  password: string
};

export type IUserInputModel = {
  login: string;
  password: string;
  email: string;
};
