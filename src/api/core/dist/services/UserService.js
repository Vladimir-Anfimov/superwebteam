"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UsersDao_1 = require("../daos/UsersDao");
class UserService {
    static async updateLastTimeActive(idUser) {
        await UsersDao_1.UsersDao.updateLastTimeActive(idUser);
    }
}
exports.UserService = UserService;
