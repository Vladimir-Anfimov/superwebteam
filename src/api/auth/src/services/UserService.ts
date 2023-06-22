import { UsersDao } from "../daos/UsersDao";
import { UserLoginRequestDto } from "../dtos/User/Login/UserLoginRequestDto";
import { UserRegisterRequestDto } from "../dtos/User/Register/UserRegisterRequestDto";
import { UserRegisterResponseDto } from "../dtos/User/Register/UserRegisterResponseDto";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { BadRequestException } from "../exceptions/BadRequestException";
import { UserLoginResponseDto } from "../dtos/User/Login/UserLoginResponseDto";
import { NotFoundException } from "../exceptions/NotFoundException";
import { EmailValidator } from "../validators/EmailValidator";
import { RefreshTokenDao } from "../daos/RefreshTokenDao";
import { RefreshToken } from "../entities/RefreshToken";
import { RolesDao } from "../daos/RolesDao";
import { EmailChangeRequestDto } from "../dtos/User/Data/EmailChangeRequestDto";
import { PasswordChangeRequestDto } from "../dtos/User/Data/PasswordChangeRequestDto";

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

    const token = await this.generateToken(createdUser);

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

    const token = await this.generateToken(user);

    await UsersDao.updateLastTimeActive(user.id);

    return new UserLoginResponseDto(token, refreshToken.value);
  }

  public static async refresh(refreshToken: string): Promise<string> {
    const refreshTokenFromDb = await RefreshTokenDao.getByValue(refreshToken);

    const user = await UsersDao.getById(refreshTokenFromDb.id_user);

    if (!refreshTokenFromDb) {
      throw new BadRequestException("Invalid refresh token");
    }

    await UsersDao.updateLastTimeActive(user.id);

    return this.generateToken(user);
  }

  private static async generateToken(user: User): Promise<string> {
    const rolesFromDb = await RolesDao.getRolesByUserId(user.id);

    console.log(rolesFromDb);

    const token = await jwt.sign(
      { id: user.id, roles: [...rolesFromDb], email: user.email },
      process.env.JWT_KEY!,
      {
        expiresIn: process.env.JWT_EXPIRES_IN!,
      }
    );

    return token;
  }

  public static async updateEmail(
    emailChangeDto: EmailChangeRequestDto,
    idUser: number
  ) {
    if (!EmailValidator.validate(emailChangeDto.newEmail)) {
      throw new BadRequestException("Invalid email format.");
    }

    const user = await UsersDao.getUserByEmail(emailChangeDto.newEmail);

    if (user != null) {
      if (user.id === idUser) {
        throw new BadRequestException("You already have this email");
      }
      throw new BadRequestException("Email is already taken");
    }

    await UsersDao.updateLastTimeActive(idUser);

    await UsersDao.updateEmail(idUser, emailChangeDto.newEmail);
  }

  public static async updatePassword(
    passwordChangeDto: PasswordChangeRequestDto,
    idUser: number
  ) {
    if (passwordChangeDto.newPassword.length < 8) {
      throw new BadRequestException(
        "Password must be at least 8 characters long"
      );
    }

    const user = await UsersDao.getById(idUser);

    if (
      !(await bcrypt.compare(
        passwordChangeDto.currentPassword,
        user.hashed_password
      ))
    ) {
      throw new NotFoundException("User password is incorrect");
    }

    const hashed_password = await bcrypt.hash(
      passwordChangeDto.newPassword,
      10
    );

    await UsersDao.updateLastTimeActive(idUser);

    await UsersDao.updatePassword(idUser, hashed_password);
  }
}
