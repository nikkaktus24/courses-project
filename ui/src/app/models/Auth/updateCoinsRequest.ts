export class UpdateCoinsRequest {
    public id: string;
    public coins: number;

    constructor(id: string, coins: number) {
        this.id = id;
        this.coins = coins;
    }
}