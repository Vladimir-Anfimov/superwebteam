export class ChartsInput {
    public counties : number [];
    public startDate : Date;
    public endDate : Date;
    public criteria : string [];

    constructor (counties : number [], startDate : Date, endDate : Date, criteria : string [])
    {
        this.counties = counties;
        this.startDate = startDate;
        this.endDate = endDate;
        this.criteria = criteria;
    }
}