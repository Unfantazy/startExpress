import { IUserDbModel, IUserInputModel } from "../types/userTypes";
import { usersRepository } from "../infrasrtucture/usersRepository";

export const userService = {
  async createUser(user: IUserInputModel) {
    const newUser: IUserDbModel = {
      ...user,
      createdAt: new Date().toISOString(),
    };
    return await usersRepository.createUser(newUser);
  },
  async deleteUser(id: string) {
    console.log('deleteUser', id)
    return await usersRepository.deleteUser(id);
  },
};
