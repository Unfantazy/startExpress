import { SortDirection } from "mongodb";

type QueryType = {
  sortBy?: string;
  sortDirection?: SortDirection;
  pageNumber?: string;
  pageSize?: string;
};

type ReturnQueryType = {
  sortBy: string;
  sortDirection: SortDirection;
  pageNumber: number;
  pageSize: number;
};
export const getDefaultQueryParams = (query: QueryType): ReturnQueryType => {
  return {
    pageNumber: query.pageNumber ? +query.pageNumber : 1,
    pageSize: query.pageSize ? +query.pageSize : 10,
    sortBy: query.sortBy || "createdAt",
    sortDirection: query.sortDirection || "desc",
  };
};
