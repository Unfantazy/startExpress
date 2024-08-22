import {ObjectId, SortDirection} from "mongodb";

export type IBlogInputModel = {
  name: string; // max 15
  description: string; // max 500
  websiteUrl: string; // max 100 ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
};

export type IBlogViewModel = {
  id: string;
  name: string; // max 15
  description: string; // max 500
  websiteUrl: string; // max 100 ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
  createdAt: string;
  isMembership: boolean;
};

export type IBlogDbModel = {
  _id: ObjectId;
  name: string; // max 15
  description: string; // max 500
  websiteUrl: string; // max 100 ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$,
  createdAt: string;
  isMembership: boolean;
};

export type QueryType = {
  sortBy?: string;
  searchNameTerm?: string | null;
  sortDirection?: SortDirection;
  pageNumber?: string;
  pageSize?: string;
};
