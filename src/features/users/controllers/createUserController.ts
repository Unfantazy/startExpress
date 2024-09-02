import { Request, Response } from "express";
import { HttpCodes } from "../../../common/httpCodes";
import { IUserInputModel, IUserViewModel } from "../types/userTypes";
import { usersQueryRepository } from "../infrasrtucture/usersQueryRepository";
import { userService } from "../services/userService";

export const createUserController = async (
  req: Request<{}, IUserViewModel, IUserInputModel, {}>,
  res: Response<IUserViewModel>,
) => {
  const id = await userService.createUser(req.body);
  const user = await usersQueryRepository.getUserById(id);

  if (user) {
    res.status(HttpCodes.Created).json(user);
    return;
  }

  res.sendStatus(HttpCodes.NotFound);
};
