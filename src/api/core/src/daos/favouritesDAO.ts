import { FavouritesInputDto } from "../dtos/charts/FavouritesInputDto";
import {pool} from "../db";

export class FavouritesDAO {
    public static async insertFavourite(input : FavouritesInputDto)
    {
        const query = "INSERT INTO favourites(user_id, query) VALUES($1, $2);";

        const result = pool.query(query, [input.userId, input.content]);
    }
}