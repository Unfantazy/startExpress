import { Router } from "express";
import { getUsersController } from "./controllers/getUsersController";
import { createUserController } from "./controllers/createUserController";
import { deleteUserController } from "./controllers/deleteUserController";
import { adminMiddleware } from "../../global-middlewares/admin-middleware";
import { createUserValidator } from "./middlewares/createUserValidator";

export const usersRouter = Router();

usersRouter
  .get("/", adminMiddleware, getUsersController)
  .post("/", ...createUserValidator, createUserController)
  .delete("/:id", adminMiddleware, deleteUserController);
