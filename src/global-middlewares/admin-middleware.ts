import { NextFunction, Request, Response } from "express";
import { SETTINGS } from "../settings";
import { HttpCodes } from "../common/httpCodes";

export const fromBase64ToUTF8 = (code: string) => {
  return Buffer.from(code, "base64").toString("utf8");
};
export const fromUTF8ToBase64 = (code: string) => {
  return Buffer.from(code, "utf8").toString("base64");
};

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const auth = req.headers["authorization"];
  const codedAuth = fromUTF8ToBase64(SETTINGS.ADMIN);

  if (!auth || !auth.includes("Basic") || auth.slice(6) !== codedAuth) {
    res.status(HttpCodes.Unauthorized).json({});
    return;
  }

  next();
};
