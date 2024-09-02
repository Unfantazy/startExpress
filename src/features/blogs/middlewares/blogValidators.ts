import { body } from "express-validator";
import { inputCheckErrorsMiddleware } from "../../../global-middlewares/inputCheckErrorsMiddleware";
import { adminMiddleware } from "../../../global-middlewares/admin-middleware";

export const nameValidator = body("name")
  .isString()
  .withMessage("not string")
  .trim()
  .isLength({ min: 1, max: 15 })
  .withMessage("more then 15 or 1");
export const descriptionValidator = body("description")
  .isString()
  .withMessage("not string")
  .trim()
  .isLength({ min: 1, max: 500 })
  .withMessage("more then 500 or 0");
export const websiteUrlValidator = body("websiteUrl")
  .isString()
  .withMessage("not string")
  .trim()
  .isURL()
  .withMessage("not url")
  .isLength({ min: 1, max: 100 })
  .withMessage("more then 100 or 0");

export const blogValidators = [
  adminMiddleware,

  nameValidator,
  descriptionValidator,
  websiteUrlValidator,

  inputCheckErrorsMiddleware(true),
];
