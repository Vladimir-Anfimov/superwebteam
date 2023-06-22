import {FavouritesInputDto} from "../dtos/charts/FavouritesInputDto";
import {FavouritesDAO} from "../daos/favouritesDAO";
import { Chart } from "../dtos/charts/Chart";
import {FavChart} from "../dtos/charts/FavChart";

export class FavouritesService {
    public static async insertFavourite(id: number, input : FavouritesInputDto) : Promise<number>
    {
        const chartId = await FavouritesDAO.insertFavourite(id, input.content);

        return chartId;
    }

    public static async getFavourites(id: number) : Promise<FavChart[]>
    {
        const charts : FavChart[] = await FavouritesDAO.getFavourites(id);

        return charts;
    }

    public static async deleteFavourite(userId : number, chartId : number) : Promise<string>
    {
        return await FavouritesDAO.deleteFavourite(userId, chartId);
    }
}