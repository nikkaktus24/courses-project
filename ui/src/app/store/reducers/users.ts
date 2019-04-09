import { ActionPayload } from './../../interfaces/ActionPayload';
import { UserData } from './../../models/Shared/UserData';
import { UserConstants } from '../constants/user';

export type IUserState = {
    userData: UserData;
    isLoggedIn: boolean;
    error: string;
    isLoading: boolean;

};

const initialState: IUserState = {
    userData: void 0,
    error: void 0,
    isLoggedIn: false, // CHANGE IT IF IT NEEDED
    isLoading: false,
};

export function userReducer(state = initialState, action: ActionPayload<any>): IUserState {
    switch (action.type) {
        case UserConstants.FETCH_USER: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case UserConstants.FETCH_USER_OK: {
            return {
                ...state,
                userData: action.payload,
                isLoggedIn: true,
                isLoading: initialState.isLoading,
            };
        }
        case UserConstants.FETCH_USER_FAIL: {
            return {
                ...state,
                isLoading: initialState.isLoading,
                error: action.payload,
            };
        }
        case UserConstants.CLEAR: {
            return {
                ...state,
                isLoading: initialState.isLoading,
                error: initialState.error,
            };
        }
        case UserConstants.LOGOUT: {
            return {
                ...state,
                isLoading: true,
                error: initialState.error,
                isLoggedIn: initialState.isLoggedIn,
            };
        }
        case UserConstants.LOGOUT_OK: {
            return {
                ...state,
                isLoading: initialState.isLoading,
                error: initialState.error,
                userData: initialState.userData,
            };
        }
        default:
            return {
                ...state,
            };
    }
}
