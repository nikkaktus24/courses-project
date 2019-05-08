import { IUserData } from './../../interfaces/Auth/UserDataDTO';
import { PersonName } from './PersonName';
import { Persmission } from '../../enums/persmission-enum';

export class UserData {
    public id: number;
    public login: string;
    public name: PersonName;
    public permission: Persmission;
    public isAdmin: boolean;
    public isOwner: boolean;
    public coins: number;

    public static updateRequest(model: IUserData): UserData {
        const user: UserData = new UserData();

        user.id = model.id;
        user.login = model.login;
        user.name = new PersonName(model.name);
        user.isAdmin = model.isAdmin;
        user.isOwner = model.isOwner;
        user.coins = model.coins;

        return user;
    }

    public static fromDTO(model: IUserData): UserData {
        if (!model) {
            return null;
        }

        const user: UserData = new UserData();

        user.id = model.id;
        user.login = model.login;
        user.name = new PersonName(model.name);
        user.isAdmin = model.isAdmin;
        user.isOwner = model.isOwner;
        user.coins = model.coins;

        return user;
    }

    constructor() { }

}