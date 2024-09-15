import { Request, Response, Router } from "express";
import { passwordValidation } from "../users/middlewares/password.validation";
import { loginOrEmailValidation } from "../users/middlewares/loginOrEmailValidation";
import { inputCheckErrorsMiddleware } from "../../global-middlewares/inputCheckErrorsMiddleware";
import { authService } from "./authService";
import { ILoginInputModel } from "./types";

export const authRouter = Router();

authRouter.post(
  "/",
  passwordValidation,
  loginOrEmailValidation,
  inputCheckErrorsMiddleware(true),
  async (req: Request<{}, any, ILoginInputModel, {}>, res: Response<any>) => {
    const { loginOrEmail, password } = req.body;

    const accessToken = await authService.loginUser(loginOrEmail, password);
    if (!accessToken) return res.sendStatus(401);

    return res.sendStatus(204);
  },
);
