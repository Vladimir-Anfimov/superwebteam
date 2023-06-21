export class FavouritesInputDto {
    public userId : number;
    public content : string;

    constructor (userId : number, content : string)
    {
        this.userId = userId;
        this.content = content;
    }
}