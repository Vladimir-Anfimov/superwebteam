import { UnemploymentDAO } from "../daos/unemploymentDAO";
import { IUnemployment } from "../entities/unemployment";
import { Chart } from "../dtos/charts/Chart";
import { FavChart } from "../dtos/charts/FavChart";
import { ChartsInput } from "../dtos/charts/ChartsInput";
import { ChartsService } from "../services/ChartsService";
import { FavouritesInputDto } from "../dtos/charts/FavouritesInputDto";
import { FavouritesService } from "../services/FavouritesService";

export const resolvers = {
  Query: {
    unemploymentData: async (
      _: any,
      __: any,
      context: any
    ): Promise<IUnemployment[]> => {
      const user = context.user;
      console.warn("USER CITIT DIN CONTEXT: " + JSON.stringify(user));

      return await UnemploymentDAO.getAllUnemploymentData();
    },
    getCharts: async (
      _: any,
      { input }: { input: ChartsInput }
    ): Promise<Chart[]> => {
      return await ChartsService.getChart(input);
    },
    getFavouriteCharts: async (
      _: any,
      __: any,
      context: any
    ): Promise<FavChart[]> => {
      const userId = context.user.id;
      return await FavouritesService.getFavourites(userId);
    },
  },
  Mutation: {
    insertFavourite: async (
      _: any,
      { input }: { input: FavouritesInputDto },
      context: any
    ): Promise<number> => {
      const userId = context.user.id;
      return await FavouritesService.insertFavourite(userId, input);
    },
    deleteFavourite: async (
      _: any,
      { input }: {input : number},
      context: any
    ): Promise<string> => {
      const userId = context.user.id;
      return await FavouritesService.deleteFavourite(userId, input);
    },
  },
};
