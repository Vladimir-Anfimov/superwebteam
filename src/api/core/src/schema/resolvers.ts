import { UnemploymentDAO } from "../daos/unemploymentDAO";
import { IUnemployment } from "../entities/unemployment";
import { Chart } from "../dtos/charts/Chart";
import { ChartsInput } from "../dtos/charts/ChartsInput";
import { ChartsService } from "../services/ChartsService";
import { FavouritesInputDto } from "../dtos/charts/FavouritesInputDto";
import { FavouritesService } from "../services/FavouritesService";
import { UserPageRequestDto } from "../dtos/admin/UserPageRequestDto";
import { UserPageResponseDto } from "../dtos/admin/UserPageResponseDto";
import { AdminService } from "../services/AdminService";

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
    authVerify: async (): Promise<string> => {
      return "OK";
    },
    getUsers: async (
      _: any,
      { input }: { input: UserPageRequestDto },
      context: any
    ): Promise<UserPageResponseDto> => {
      const user = context.user;
      await AdminService.checkForAdminRoleOrThrowError(user);

      return await AdminService.getByPage(input);
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
