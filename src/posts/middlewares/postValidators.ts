import { body } from "express-validator";
import { adminMiddleware } from "../../global-middlewares/admin-middleware";
import { inputCheckErrorsMiddleware } from "../../global-middlewares/inputCheckErrorsMiddleware";

export const titleValidator = body("title")
  .isString()
  .withMessage("not string")
  .trim()
  .isLength({ min: 1, max: 30 })
  .withMessage("more then 30 or 1");
export const shortDescriptionValidator = body("shortDescription")
  .isString()
  .withMessage("not string")
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage("more then 100 or 0");
export const contentValidator = body("content")
  .isString()
  .withMessage("not string")
  .trim()
  .isLength({ min: 1, max: 1000 })
  .withMessage("more then 1000 or 0");

export const blogIdValidator = body("blogId")
  .isString()
  .trim()
  .isLength({ min: 1, max: 50 });

export const postValidator = [
  adminMiddleware,

  titleValidator,
  shortDescriptionValidator,
  contentValidator,
  blogIdValidator,

  inputCheckErrorsMiddleware(false),
];
