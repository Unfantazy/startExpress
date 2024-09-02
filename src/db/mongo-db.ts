import { SETTINGS } from "../settings";
import { Collection, Db, MongoClient } from "mongodb";
import { IBlogDbModel } from "../features/blogs/types";
import { IUserDbModel } from "../features/users/types/userTypes";
import { IPostDbModel } from "../features/posts/types";

export const client: MongoClient = new MongoClient(SETTINGS.MONGO_URL);
export const db: Db = client.db(SETTINGS.DB_NAME);

// получение доступа к коллекциям
export const blogCollection: Collection<any> = db.collection<IBlogDbModel>(
  SETTINGS.BLOG_COLLECTION_NAME,
);
export const userCollection: Collection<any> = db.collection<IUserDbModel>(
  SETTINGS.USER_COLLECTION_NAME,
);
export const postCollection: Collection<any> = db.collection<IPostDbModel>(
  SETTINGS.POST_COLLECTION_NAME,
);

export const connectToDB = async () => {
  try {
    await client.connect();
    console.log("connected to db");
    return true;
  } catch (e) {
    console.log(e);
    await client.close();
    return false;
  }
};
