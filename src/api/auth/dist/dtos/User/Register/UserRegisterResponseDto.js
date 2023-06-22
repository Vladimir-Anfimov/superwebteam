"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegisterResponseDto = void 0;
class UserRegisterResponseDto {
    constructor(token, refreshToken) {
        this.token = token;
        this.refreshToken = refreshToken;
    }
}
exports.UserRegisterResponseDto = UserRegisterResponseDto;
