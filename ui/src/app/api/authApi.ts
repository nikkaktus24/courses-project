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

    public static async fetchUserData(model: TokenModel): Promise<IUserData> {
        return getResponse(axios.post<SessionModel>(EndService.userData(), model));
    }

    constructor() {}
}
