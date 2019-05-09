import { JoinModel } from './../models/Auth/JoinModel';
import { UserData } from './../models/Shared/UserData';
import { IUserData } from './../interfaces/Auth/UserDataDTO';
import { ICheckSessionDTO } from '../interfaces/Auth/checkSessionDTO';
import { AuthApi } from './../api/authApi';
import { StorageService } from './storageService';
import { UserConstants } from '../store/constants/user';
import { SessionModel } from '../models/Auth/SessionModel';
import { TokenModel } from '../models/Auth/TokenModel';
import Axios from 'axios';
import getError from '../helpers/getError';

const TOKEN_NAME: string = 'USER_TOKEN';

export class AuthService {

    public static checkToken(): boolean {
        return StorageService.get<boolean>(TOKEN_NAME);
    }

    public static getToken(): string {
        return StorageService.get<string>(TOKEN_NAME);
    }

    public static setToken(token: string): void {
        StorageService.set<string>(TOKEN_NAME, token);
    }

    public static logout() {
        return async (dispatch: any) => {
            dispatch({
                type: UserConstants.LOGOUT,
            });

            await setTimeout(() => {}, 200);
            StorageService.delete(TOKEN_NAME);

            dispatch({
                type: UserConstants.LOGOUT_OK,
            });
        };
    }

    public static fetchSession(model: SessionModel) {
        return async (dispatch: any) => {
            dispatch({
                type: UserConstants.FETCH_USER,
            });
            try {
                const checkSession: ICheckSessionDTO = await AuthApi.checkSession(model);

                const tokenModel: TokenModel = new TokenModel(checkSession.token);
                AuthService.setToken(tokenModel.token);

                const result: IUserData = await AuthApi.fetchUserData(tokenModel);
                const payload: UserData = UserData.fromDTO(result);

                AuthService.initInterceptors(tokenModel.token);

                dispatch({
                    type: UserConstants.FETCH_USER_OK,
                    payload,
                });
            } catch (err) {
                dispatch({
                    type: UserConstants.FETCH_USER_FAIL,
                    payload: getError(err),
                });
            }
        };
    }

    public static join(model: JoinModel) {
        return async (dispatch: any) => {
            dispatch({
                type: UserConstants.FETCH_USER,
            });
            try {
                const checkSession: ICheckSessionDTO = await AuthApi.createUser(model);

                const tokenModel: TokenModel = new TokenModel(checkSession.token);
                AuthService.setToken(tokenModel.token);

                const result: IUserData = await AuthApi.fetchUserData(tokenModel);
                const payload: UserData = UserData.fromDTO(result);

                AuthService.initInterceptors(tokenModel.token);

                dispatch({
                    type: UserConstants.FETCH_USER_OK,
                    payload,
                });
            } catch (err) {
                dispatch({
                    type: UserConstants.FETCH_USER_FAIL,
                    payload: getError(err),
                });
            }
        };
    }

    public static fetchUserData(token: string) {
        return async (dispatch: any) => {
            dispatch({
                type: UserConstants.FETCH_USER,
            });
            try {
                const tokenModel: TokenModel = new TokenModel(token);
                const result: IUserData = await AuthApi.fetchUserData(tokenModel);
                const payload: UserData = UserData.fromDTO(result);

                AuthService.initInterceptors(token);

                dispatch({
                    type: UserConstants.FETCH_USER_OK,
                    payload,
                });
            } catch (err) {
                dispatch({
                    type: UserConstants.FETCH_USER_FAIL,
                    payload: getError(err),
                });
            }
        };
    }

    public static getUsers() {
        return async (dispatch: any) => {
            dispatch({
                type: UserConstants.FETCH_USERS,
            });
            try {
                const result: IUserData[] = await AuthApi.getUsers();
                const payload: UserData[] = result.map((item: IUserData) => UserData.fromDTO(item));

                dispatch({
                    type: UserConstants.FETCH_USERS_OK,
                    payload,
                });
            } catch (err) {
                dispatch({
                    type: UserConstants.FETCH_USERS_FAIL,
                    payload: getError(err),
                });
            }
        };
    }

    public static updateUser(request: UserData) {
        return async (dispatch: any) => {
            dispatch({
                type: UserConstants.UPDATE_USER,
            });
            try {
                await AuthApi.updateUser(request);

                dispatch({
                    type: UserConstants.UPDATE_USER_OK,
                });
            } catch (err) {
                dispatch({
                    type: UserConstants.UPDATE_USER_FAIL,
                    payload: getError(err),
                });
            }
        };
    }

    public static resetUsers() {
        return async (dispatch: any) => {
            dispatch({
                type: UserConstants.RESET_USERS,
            });
            try {
                await AuthApi.resetUsers();

                dispatch({
                    type: UserConstants.RESET_USERS_OK,
                });
            } catch (err) {
                dispatch({
                    type: UserConstants.RESET_USERS_FAIL,
                    payload: getError(err),
                });
            }
        };
    }

    public static clearErrors() {
        return (dispatch: any) => {
            dispatch({
                type: UserConstants.CLEAR,
            });
        };
    }

    public static initInterceptors(token: string) {
        Axios.interceptors.request.use(function (config) {
            config.headers = { 'Authorization': token };
            return config;
          }, function (error) {
            // Do something with request error
            return Promise.reject(error);
          });
    }

    constructor() {}
}
