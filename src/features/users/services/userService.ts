import { IUserDbModel, IUserInputModel } from "../types/userTypes";
import { usersRepository } from "../infrasrtucture/usersRepository";
import { bcryptService } from "../../auth/bcrypt.service";

export const userService = {
  async createUser(user: IUserInputModel) {
    const { login, password, email } = user;
    const passwordHash = await bcryptService.generateHash(password);

    const newUser: IUserDbModel = {
      login,
      email,
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    return await usersRepository.createUser(newUser);
  },
  async deleteUser(id: string) {
    return await usersRepository.deleteUser(id);
  },
};
