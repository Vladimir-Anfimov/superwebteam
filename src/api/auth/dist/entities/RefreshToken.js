"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshToken = void 0;
const uuid_1 = require("uuid");
class RefreshToken {
    constructor(id_user, value, expires_at) {
        this.id = 0;
        this.id_user = id_user;
        this.value = value;
        this.expires_at = expires_at;
    }
    static create(id_user) {
        return new RefreshToken(id_user, (0, uuid_1.v4)(), new Date(Date.now() + this.EXPIRES_IN_30_DAYS));
    }
}
exports.RefreshToken = RefreshToken;
RefreshToken.EXPIRES_IN_30_DAYS = 1000 * 60 * 60 * 24 * 30;
