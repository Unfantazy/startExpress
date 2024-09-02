import { userCollection } from "../../../db/mongo-db";
import { IUserDbModel } from "../types/userTypes";
import { ObjectId } from "mongodb";

export const usersRepository = {
  async createUser(user: IUserDbModel) {
    const { insertedId } = await userCollection.insertOne(user);
    return insertedId.toString();
  },
  async deleteUser(id: string): Promise<boolean> {
    const { deletedCount } = await userCollection.deleteOne({
      _id: new ObjectId(id),
    });
    return deletedCount === 1;
  },
  async findByLoginOrEmail(loginOrEmail: string): Promise<IUserDbModel | null> {
    return userCollection.findOne({
      $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
    });
  },
};
