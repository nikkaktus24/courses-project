import { ActionPayload } from './../../interfaces/ActionPayload';
import { CourseConstants } from './../constants/courses';
import { Course } from './../../models/Courses/Courses';

export type ICoursesState = {
    courses: Course[];
    store: string[];
    error: string;
    isLoading: boolean;
};

const initialState: ICoursesState = {
    courses: void 0,
    store: [],
    error: void 0,
    isLoading: false,
};

export function coursesReducer(state = initialState, action: ActionPayload<any>): ICoursesState {
    switch (action.type) {
        case CourseConstants.FETCH_COURSES: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case CourseConstants.FETCH_COURSES_OK: {
            return {
                ...state,
                courses: action.payload,
                isLoading: initialState.isLoading,
            };
        }
        case CourseConstants.FETCH_COURSES_FAIL: {
            return {
                ...state,
                isLoading: initialState.isLoading,
                error: action.payload,
            };
        }
        case CourseConstants.STORE_WORK: {
            return {
                ...state,
                store: action.payload,
            };
        }
        default:
            return {
                ...state,
            };
    }
}
