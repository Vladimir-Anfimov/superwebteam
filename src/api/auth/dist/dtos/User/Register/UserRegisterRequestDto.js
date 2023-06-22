"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegisterRequestDto = void 0;
class UserRegisterRequestDto {
    constructor(email, password, confirm_password) {
        this.email = email;
        this.password = password;
        this.confirmPassword = confirm_password;
    }
}
exports.UserRegisterRequestDto = UserRegisterRequestDto;
