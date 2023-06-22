"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailValidator = void 0;
class EmailValidator {
    static validate(email) {
        return this.emailRegex.test(email);
    }
}
exports.EmailValidator = EmailValidator;
EmailValidator.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
