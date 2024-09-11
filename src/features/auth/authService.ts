import { usersRepository } from "../users/infrasrtucture/usersRepository";
import { bcryptService } from "./bcrypt.service";
import { IUserDbModel } from "../users/types/userTypes";

export const authService = {
  async loginUser(
    loginOrEmail: string,
    password: string,
  ): Promise<IUserDbModel | null> {
    return this.checkUserCredentials(loginOrEmail, password);
  },

  async checkUserCredentials(
    loginOrEmail: string,
    password: string,
  ): Promise<IUserDbModel | null> {
    const user = await usersRepository.findByLoginOrEmail(loginOrEmail);
    if (!user) return null;

    const isPassCorrect = await bcryptService.checkPassword(
      password,
      user.passwordHash,
    );
    if (!isPassCorrect) return null;

    return user;
  },
};
