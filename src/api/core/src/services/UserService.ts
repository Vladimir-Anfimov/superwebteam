import { UsersDao } from "../daos/UsersDao";

export class UserService {
  public static async updateLastTimeActive(idUser: number) {
    await UsersDao.updateLastTimeActive(idUser);
  }
}
