import { Request, Response } from "express";
import { IItemsWithPagination } from "../../../input-output-types/output-errors-type";
import { HttpCodes } from "../../../common/httpCodes";
import { usersQueryRepository } from "../infrasrtucture/usersQueryRepository";
import { IUserViewModel, UserQueryType } from "../types/userTypes";
import { getDefaultQueryParams } from "../../../common/getDefaultQueryParams";

export const getUsersController = async (
  req: Request<{}, IItemsWithPagination<IUserViewModel>, {}, UserQueryType>, // Уберите лишние параметры типа
  res: Response<IItemsWithPagination<IUserViewModel>>,
) => {
  const query = getDefaultQueryParams(req.query);
  const { searchEmailTerm, searchLoginTerm } = req.query;
  const users = await usersQueryRepository.getAllUsers({
    ...query,
    searchEmailTerm,
    searchLoginTerm,
  });
  res.status(HttpCodes.Success).json(users);
};
