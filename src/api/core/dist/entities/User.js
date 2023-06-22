"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, email, hashed_password) {
        this.id = id;
        this.email = email;
        this.hashed_password = hashed_password;
        const now = new Date();
        this.last_time_active = now;
        this.created_at = now;
    }
    static create(email, hashed_password) {
        return new User(0, email, hashed_password);
    }
}
exports.User = User;
