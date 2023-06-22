"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordChangeRequestDto = void 0;
class PasswordChangeRequestDto {
    constructor(currentPassword, newPassword) {
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
    }
}
exports.PasswordChangeRequestDto = PasswordChangeRequestDto;
