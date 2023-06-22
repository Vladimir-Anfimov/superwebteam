"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavouritesService = void 0;
const favouritesDAO_1 = require("../daos/favouritesDAO");
class FavouritesService {
    static async insertFavourite(id, input) {
        const chartId = await favouritesDAO_1.FavouritesDAO.insertFavourite(id, input.content);
        return chartId;
    }
    static async getFavourites(id) {
        const charts = await favouritesDAO_1.FavouritesDAO.getFavourites(id);
        return charts;
    }
    static async deleteFavourite(userId, chartId) {
        return await favouritesDAO_1.FavouritesDAO.deleteFavourite(userId, chartId);
    }
}
exports.FavouritesService = FavouritesService;
