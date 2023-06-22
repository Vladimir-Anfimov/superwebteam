import { RolesDao } from "../daos/RolesDao";
import { UsersDao } from "../daos/UsersDao";
import { UserPageRequestDto } from "../dtos/admin/UserPageRequestDto";
import { UserPageResponseDto } from "../dtos/admin/UserPageResponseDto";
import { User } from "../entities/User";
import { UnauthorisedException } from "../exceptions/UnauthorisedException";
import { BadRequestException } from "../exceptions/BadRequestException";

export class AdminService {
  public static async checkForAdminRoleOrThrowError(user: User) {
    const roles = await RolesDao.getRolesByUserId(user.id);
    if (!roles.includes("ADMIN")) {
      throw new UnauthorisedException("User is not an admin.");
    }
  }

  public static async getByPage(
    userPageRequest: UserPageRequestDto
  ): Promise<UserPageResponseDto> {
    if (userPageRequest.pageNumber < 0 || userPageRequest.pageSize < 0) {
      throw new BadRequestException(
        "Page number and page size must be positive."
      );
    }

    const users = await UsersDao.getFromPage(
      userPageRequest.pageNumber,
      userPageRequest.pageSize
    );
    const usersCount = await UsersDao.count();

    return new UserPageResponseDto(
      users,
      userPageRequest.pageNumber,
      userPageRequest.pageSize,
      usersCount > (userPageRequest.pageNumber + 1) * userPageRequest.pageSize,
      userPageRequest.pageNumber > 0
    );
  }
}
