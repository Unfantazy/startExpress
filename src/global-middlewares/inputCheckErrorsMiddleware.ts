import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";
import { OutputErrorsType } from "../input-output-types/output-errors-type";

export const inputCheckErrorsMiddleware =
  (onlyFirstError = true) =>
  (req: Request, res: Response<OutputErrorsType>, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      const errors = error.array({ onlyFirstError }) as {
        path: any;
        msg: string;
      }[];

      res.status(400).json({
        errorsMessages: errors.map((error) => ({
          field: error.path,
          message: error.msg,
        })),
      });
      return;
    }

    next();
  };
