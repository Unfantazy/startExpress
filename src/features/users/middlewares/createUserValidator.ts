import {adminMiddleware} from "../../../global-middlewares/admin-middleware";
import {passwordValidation} from "./password.validation";
import {loginValidation} from "./login.validation";
import {emailValidation} from "./email.validation";
import {inputCheckErrorsMiddleware} from "../../../global-middlewares/inputCheckErrorsMiddleware";

export const createUserValidator = [
  adminMiddleware,

  passwordValidation,
  loginValidation,
  emailValidation,

  inputCheckErrorsMiddleware(true),
];
