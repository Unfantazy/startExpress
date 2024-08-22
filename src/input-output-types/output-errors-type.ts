export type OutputErrorsType = {
  errorsMessages: { message: string; field: string }[];
};

export type IItemsWithPagination<T> = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: T[];
};
