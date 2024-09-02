import { QueryType } from "./types";

export const getDefaultQueryParams = (query: QueryType) => {
  return {
    pageNumber: query.pageNumber ? +query.pageNumber : 1,
    pageSize: query.pageSize ? +query.pageSize : 10,
    sortBy: query.sortBy || "createdAt",
    sortDirection: query.sortDirection || "desc",
    searchNameTerm: query.searchNameTerm ? query.searchNameTerm : null,
  };
};
