"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UsersDao_1 = require("../daos/UsersDao");
const UserRegisterResponseDto_1 = require("../dtos/User/Register/UserRegisterResponseDto");
const User_1 = require("../entities/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const BadRequestException_1 = require("../exceptions/BadRequestException");
const UserLoginResponseDto_1 = require("../dtos/User/Login/UserLoginResponseDto");
const NotFoundException_1 = require("../exceptions/NotFoundException");
const EmailValidator_1 = require("../validators/EmailValidator");
const RefreshTokenDao_1 = require("../daos/RefreshTokenDao");
const RefreshToken_1 = require("../entities/RefreshToken");
const RolesDao_1 = require("../daos/RolesDao");
dotenv_1.default.config();
class UserService {
    static async register(userRegisterDto) {
        if (!EmailValidator_1.EmailValidator.validate(userRegisterDto.email)) {
            throw new BadRequestException_1.BadRequestException("Invalid email format.");
        }
        if (userRegisterDto.password !== userRegisterDto.confirmPassword) {
            throw new BadRequestException_1.BadRequestException("Passwords do not match");
        }
        if (userRegisterDto.password.length < 8) {
            throw new BadRequestException_1.BadRequestException("Password must be at least 8 characters long");
        }
        if (await UsersDao_1.UsersDao.getUserByEmail(userRegisterDto.email)) {
            throw new BadRequestException_1.BadRequestException("Email already exists");
        }
        const hashed_password = await bcrypt_1.default.hash(userRegisterDto.password, 10);
        const user = User_1.User.create(userRegisterDto.email, hashed_password);
        const createdUser = await UsersDao_1.UsersDao.add(user);
        await RolesDao_1.RolesDao.addUserRole(createdUser.id);
        const refreshToken = await RefreshTokenDao_1.RefreshTokenDao.add(RefreshToken_1.RefreshToken.create(createdUser.id));
        const token = await this.generateToken(createdUser);
        return new UserRegisterResponseDto_1.UserRegisterResponseDto(token, refreshToken.value);
    }
    static async login(userLoginDto) {
        if (!EmailValidator_1.EmailValidator.validate(userLoginDto.email)) {
            throw new BadRequestException_1.BadRequestException("Invalid email format.");
        }
        const user = await UsersDao_1.UsersDao.getUserByEmail(userLoginDto.email);
        if (!user) {
            throw new NotFoundException_1.NotFoundException("User and/or password is incorrect");
        }
        if (!(await bcrypt_1.default.compare(userLoginDto.password, user.hashed_password))) {
            throw new NotFoundException_1.NotFoundException("User and/or password is incorrect");
        }
        const refreshToken = await RefreshTokenDao_1.RefreshTokenDao.add(RefreshToken_1.RefreshToken.create(user.id));
        const token = await this.generateToken(user);
        await UsersDao_1.UsersDao.updateLastTimeActive(user.id);
        return new UserLoginResponseDto_1.UserLoginResponseDto(token, refreshToken.value);
    }
    static async refresh(refreshToken) {
        const refreshTokenFromDb = await RefreshTokenDao_1.RefreshTokenDao.getByValue(refreshToken);
        const user = await UsersDao_1.UsersDao.getById(refreshTokenFromDb.id_user);
        if (!refreshTokenFromDb) {
            throw new BadRequestException_1.BadRequestException("Invalid refresh token");
        }
        await UsersDao_1.UsersDao.updateLastTimeActive(user.id);
        return this.generateToken(user);
    }
    static async generateToken(user) {
        const rolesFromDb = await RolesDao_1.RolesDao.getRolesByUserId(user.id);
        console.log(rolesFromDb);
        const token = await jsonwebtoken_1.default.sign({ id: user.id, roles: [...rolesFromDb], email: user.email }, process.env.JWT_KEY, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        return token;
    }
    static async updateEmail(emailChangeDto, idUser) {
        if (!EmailValidator_1.EmailValidator.validate(emailChangeDto.newEmail)) {
            throw new BadRequestException_1.BadRequestException("Invalid email format.");
        }
        const user = await UsersDao_1.UsersDao.getUserByEmail(emailChangeDto.newEmail);
        if (user != null) {
            if (user.id === idUser) {
                throw new BadRequestException_1.BadRequestException("You already have this email");
            }
            throw new BadRequestException_1.BadRequestException("Email is already taken");
        }
        await UsersDao_1.UsersDao.updateLastTimeActive(idUser);
        await UsersDao_1.UsersDao.updateEmail(idUser, emailChangeDto.newEmail);
    }
    static async updatePassword(passwordChangeDto, idUser) {
        if (passwordChangeDto.newPassword.length < 8) {
            throw new BadRequestException_1.BadRequestException("Password must be at least 8 characters long");
        }
        const user = await UsersDao_1.UsersDao.getById(idUser);
        if (!(await bcrypt_1.default.compare(passwordChangeDto.currentPassword, user.hashed_password))) {
            throw new NotFoundException_1.NotFoundException("User password is incorrect");
        }
        const hashed_password = await bcrypt_1.default.hash(passwordChangeDto.newPassword, 10);
        await UsersDao_1.UsersDao.updateLastTimeActive(idUser);
        await UsersDao_1.UsersDao.updatePassword(idUser, hashed_password);
    }
}
exports.UserService = UserService;
