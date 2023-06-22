"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const UserService_1 = require("../services/UserService");
const RefreshResponseDto_1 = require("../dtos/User/Refresh/RefreshResponseDto");
const UnauthorisedException_1 = require("../exceptions/UnauthorisedException");
const resolvers = {
    Mutation: {
        login: async (_, { input }) => {
            return await UserService_1.UserService.login(input);
        },
        register: async (_, { input }) => {
            return await UserService_1.UserService.register(input);
        },
        refresh: async (_, { input }) => {
            const token = await UserService_1.UserService.refresh(input.refreshToken);
            return new RefreshResponseDto_1.RefreshResponseDto(token);
        },
        updateEmail: async (_, { input }, context) => {
            const user = context.user;
            if (!user) {
                throw new UnauthorisedException_1.UnauthorisedException("User not authenticated");
            }
            await UserService_1.UserService.updateEmail(input, user.id);
            return "OK";
        },
        updatePassword: async (_, { input }, context) => {
            const user = context.user;
            if (!user) {
                throw new UnauthorisedException_1.UnauthorisedException("User not authenticated");
            }
            await UserService_1.UserService.updatePassword(input, user.id);
            return "OK";
        },
    },
    Query: {
        test: () => "Hello World!",
    },
};
exports.resolvers = resolvers;
