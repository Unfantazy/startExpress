import express from "express";
import cors from "cors";
import { SETTINGS } from "./settings";
import { blogsRouter } from "./features/blogs/router";
import { postsRouter } from "./features/posts/router";
import { testingRouter } from "./testing";
import { usersRouter } from "./features/users/router";
import { authRouter } from "./features/auth/authController";

export const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  // эндпоинт, который будет показывать на верселе какая версия бэкэнда сейчас залита
  res.status(200).json({ version: "1.0" });
});

app.use(SETTINGS.PATH.BLOGS, blogsRouter);
app.use(SETTINGS.PATH.POSTS, postsRouter);
app.use(SETTINGS.PATH.TEST, testingRouter);
app.use(SETTINGS.PATH.USERS, usersRouter);
app.use(SETTINGS.PATH.AUTH.LOGIN, authRouter);
