"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginResponseDto = void 0;
class UserLoginResponseDto {
    constructor(token, refreshToken) {
        this.token = token;
        this.refreshToken = refreshToken;
    }
}
exports.UserLoginResponseDto = UserLoginResponseDto;
