import { UsersDao } from "../daos/UsersDao";
import { UserLoginRequestDto } from "../dtos/User/UserLoginRequestDto";
import { UserRegisterRequestDto } from "../dtos/User/UserRegisterRequestDto";
import { UserRegisterResponseDto } from "../dtos/User/UserRegisterResponseDto";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { BadRequestException } from "../exceptions/BadRequestException";
import { UserLoginResponseDto } from "../dtos/User/UserLoginResponseDto";
import { NotFoundException } from "../exceptions/NotFoundException";
import { EmailValidator } from "../validators/EmailValidator";
import { RefreshTokenDao } from "../daos/RefreshTokenDao";
import { RefreshToken } from "../entities/RefreshToken";
import { RolesDao } from "../daos/RolesDao";

dotenv.config();

export class UserService {
  public static async register(
    userRegisterDto: UserRegisterRequestDto
  ): Promise<UserRegisterResponseDto> {
    if (!EmailValidator.validate(userRegisterDto.email)) {
      throw new BadRequestException("Invalid email format.");
    }

    if (userRegisterDto.password !== userRegisterDto.confirmPassword) {
      throw new BadRequestException("Passwords do not match");
    }

    if (userRegisterDto.password.length < 8) {
      throw new BadRequestException(
        "Password must be at least 8 characters long"
      );
    }

    if (await UsersDao.getUserByEmail(userRegisterDto.email)) {
      throw new BadRequestException("Email already exists");
    }

    const hashed_password = await bcrypt.hash(userRegisterDto.password, 10);

    const user = User.create(userRegisterDto.email, hashed_password);

    const createdUser = await UsersDao.add(user);

    await RolesDao.addUserRole(createdUser.id);

    const refreshToken = await RefreshTokenDao.add(
      RefreshToken.create(createdUser.id)
    );

    const token = await this.generateToken(createdUser.id);

    return new UserRegisterResponseDto(token, refreshToken.value);
  }

  public static async login(
    userLoginDto: UserLoginRequestDto
  ): Promise<UserLoginResponseDto> {
    if (!EmailValidator.validate(userLoginDto.email)) {
      throw new BadRequestException("Invalid email format.");
    }

    const user = await UsersDao.getUserByEmail(userLoginDto.email);

    if (!user) {
      throw new NotFoundException("User and/or password is incorrect");
    }

    if (!(await bcrypt.compare(userLoginDto.password, user.hashed_password))) {
      throw new NotFoundException("User and/or password is incorrect");
    }

    const refreshToken = await RefreshTokenDao.add(
      RefreshToken.create(user.id)
    );

    const token = await this.generateToken(user.id);

    return new UserLoginResponseDto(token, refreshToken.value);
  }

  public static async refresh(refreshToken: string): Promise<string> {
    const refreshTokenFromDb = await RefreshTokenDao.getByValue(refreshToken);

    if (!refreshTokenFromDb) {
      throw new BadRequestException("Invalid refresh token");
    }

    return this.generateToken(refreshTokenFromDb.id_user);
  }

  private static async generateToken(id_user: number): Promise<string> {
    const rolesFromDb = await RolesDao.getRolesByUserId(id_user);

    console.log(rolesFromDb);

    const token = await jwt.sign(
      { id: id_user, roles: [...rolesFromDb] },
      process.env.JWT_KEY!,
      {
        expiresIn: process.env.JWT_EXPIRES_IN!,
      }
    );

    return token;
  }
}
