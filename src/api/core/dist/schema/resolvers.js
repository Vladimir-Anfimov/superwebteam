"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const unemploymentDAO_1 = require("../daos/unemploymentDAO");
const ChartsService_1 = require("../services/ChartsService");
const FavouritesService_1 = require("../services/FavouritesService");
const AdminService_1 = require("../services/AdminService");
exports.resolvers = {
    Query: {
        unemploymentData: async (_, __, context) => {
            const user = context.user;
            console.warn("USER CITIT DIN CONTEXT: " + JSON.stringify(user));
            return await unemploymentDAO_1.UnemploymentDAO.getAllUnemploymentData();
        },
        getCharts: async (_, { input }) => {
            return await ChartsService_1.ChartsService.getChart(input);
        },
        authVerify: async () => {
            return "OK";
        },
        getUsers: async (_, { input }, context) => {
            const user = context.user;
            await AdminService_1.AdminService.checkForAdminRoleOrThrowError(user);
            return await AdminService_1.AdminService.getByPage(input);
        },
        getFavouriteCharts: async (_, __, context) => {
            const userId = context.user.id;
            return await FavouritesService_1.FavouritesService.getFavourites(userId);
        },
    },
    Mutation: {
        insertFavourite: async (_, { input }, context) => {
            const userId = context.user.id;
            return await FavouritesService_1.FavouritesService.insertFavourite(userId, input);
        },
        deleteFavourite: async (_, { input }, context) => {
            const userId = context.user.id;
            return await FavouritesService_1.FavouritesService.deleteFavourite(userId, input);
        },
    },
};
