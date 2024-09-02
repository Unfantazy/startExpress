import { Request, Response } from "express";
import { HttpCodes } from "../../../common/httpCodes";
import { userService } from "../services/userService";

export const deleteUserController = async (
  req: Request<{ id: string }, number, {}, {}>,
  res: Response<number>,
) => {
  const isDeleted = await userService.deleteUser(req.params.id);

  if (isDeleted) {
    res.sendStatus(HttpCodes.NoContent);
    return;
  }

  res.sendStatus(HttpCodes.NotFound);
};
