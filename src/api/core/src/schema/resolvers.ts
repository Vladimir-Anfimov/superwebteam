import { UnemploymentDAO } from "../daos/unemploymentDAO";
import { IUnemployment } from "../entities/unemployment";
import { Chart } from "../dtos/charts/Chart";
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
  },
  Mutation: {
    insertFavourite: async (
      _: any,
      { input }: { input: FavouritesInputDto }
    ): Promise<string> => {
      return await FavouritesService.insertFavourite(input);
    },
  },
};
