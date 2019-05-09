import { UserData } from './../models/Shared/UserData';
import { JoinModel } from './../models/Auth/JoinModel';
import { IUserData } from './../interfaces/Auth/UserDataDTO';
import { TokenModel } from './../models/Auth/TokenModel';
import { EndService } from './../services/endService';
import axios from 'axios';
import getResponse from '../helpers/getResponse';
import { SessionModel } from '../models/Auth/SessionModel';
import { ICheckSessionDTO } from '../interfaces/Auth/checkSessionDTO';

export class AuthApi {
    public static async checkSession(model: SessionModel): Promise<ICheckSessionDTO> {
        return getResponse(axios.post<SessionModel>(EndService.login(), model));
    }

    public static async createUser(model: JoinModel): Promise<ICheckSessionDTO> {
        return getResponse(axios.put<SessionModel>(EndService.join(), model));
    }

    public static async fetchUserData(model: TokenModel): Promise<IUserData> {
        return getResponse(axios.post<SessionModel>(EndService.userData(), model));
    }

    public static async updateUser(model: UserData): Promise<void> {
        return getResponse(axios.patch<void>(EndService.updateUser(), model));
    }

    public static async resetUsers(): Promise<void> {
        return getResponse(axios.get<void>(EndService.resetUsers()));
    }

    public static async getUsers(): Promise<IUserData[]> {
        return getResponse(axios.get<IUserData[]>(EndService.getUsers()));
    }

    constructor() {}
}
