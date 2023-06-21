import {FavouritesInputDto} from "../dtos/charts/FavouritesInputDto";
import {FavouritesDAO} from "../daos/favouritesDAO";

export class FavouritesService {
    public static async insertFavourite(input : FavouritesInputDto) : Promise<string>
    {
        await FavouritesDAO.insertFavourite(input);

        return "succes";
    }
}