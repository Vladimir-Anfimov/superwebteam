"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPageResponseDto = void 0;
class UserPageResponseDto {
    constructor(users, pageNumber, pageSize, hasNextPage, hasPreviousPage) {
        this.users = users;
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.hasNextPage = hasNextPage;
        this.hasPreviousPage = hasPreviousPage;
    }
}
exports.UserPageResponseDto = UserPageResponseDto;
