"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const RolesDao_1 = require("../daos/RolesDao");
const UsersDao_1 = require("../daos/UsersDao");
const UserPageResponseDto_1 = require("../dtos/admin/UserPageResponseDto");
const UnauthorisedException_1 = require("../exceptions/UnauthorisedException");
const BadRequestException_1 = require("../exceptions/BadRequestException");
class AdminService {
    static async checkForAdminRoleOrThrowError(user) {
        const roles = await RolesDao_1.RolesDao.getRolesByUserId(user.id);
        if (!roles.includes("ADMIN")) {
            throw new UnauthorisedException_1.UnauthorisedException("User is not an admin.");
        }
    }
    static async getByPage(userPageRequest) {
        if (userPageRequest.pageNumber < 0 || userPageRequest.pageSize < 0) {
            throw new BadRequestException_1.BadRequestException("Page number and page size must be positive.");
        }
        const users = await UsersDao_1.UsersDao.getFromPage(userPageRequest.pageNumber, userPageRequest.pageSize);
        const usersCount = await UsersDao_1.UsersDao.count();
        return new UserPageResponseDto_1.UserPageResponseDto(users, userPageRequest.pageNumber, userPageRequest.pageSize, usersCount > (userPageRequest.pageNumber + 1) * userPageRequest.pageSize, userPageRequest.pageNumber > 0);
    }
}
exports.AdminService = AdminService;
