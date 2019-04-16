import { IUserName } from './UserName';

export interface IUserData {
    id: number;
    token: string;
    name: IUserName;
    login: string;
    password: string;
    isAdmin: boolean;
    coins: number;
}