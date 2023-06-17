import { UnemploymentDAO } from "../daos/unemploymentDAO";
import { IUnemployment } from "../entities/unemployment";

export const resolvers = {
  Query: {
    unemploymentData: async (): Promise<IUnemployment[]> => {
      return await UnemploymentDAO.getAllUnemploymentData();
    },
  },
};
