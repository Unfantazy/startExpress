import { config } from "dotenv";
config(); // добавление переменных из файла .env в process.env

export const SETTINGS = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL || "mongodb://0.0.0.0:27017",
  DB_NAME: process.env.DB_NAME,
  BLOG_COLLECTION_NAME: "blogs",
  POST_COLLECTION_NAME: "posts",
  USER_COLLECTION_NAME: "users",
  PATH: {
    BLOGS: "/blogs",
    POSTS: "/posts",
    TEST: "/testing",
    USERS: "/users",

    AUTH: {
      LOGIN: "/auth/login",
    },
  },
  ADMIN: process.env.ADMIN || "admin:qwerty",
};
