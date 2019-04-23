import { CoursesService } from './../../services/coursesService';
import { ActionPayload } from './../../interfaces/ActionPayload';
import { CourseConstants } from './../constants/courses';
import { Course } from './../../models/Courses/Courses';

export type ICoursesState = {
    courses: Course[];
    store: Course[];
    error: string;
    course: Course;
    isLoading: boolean;
};

const initialState: ICoursesState = {
    courses: void 0,
    store: [],
    course: void 0,
    error: void 0,
    isLoading: false,
};

export function coursesReducer(state = initialState, action: ActionPayload<any>): ICoursesState {
    switch (action.type) {
        case CourseConstants.GET_COURSE_BY_ID:
        case CourseConstants.CREATE_COURSE:
        case CourseConstants.DELETE_COURSE:
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
        case CourseConstants.UPDATE_COURSE_OK:
        case CourseConstants.GET_COURSE_BY_ID_OK:
        case CourseConstants.CREATE_COURSE_OK: {
            return {
                ...state,
                course: action.payload,
                isLoading: initialState.isLoading,
            };
        }
        case CourseConstants.DELETE_COURSE_OK: {
            return {
                ...state,
                isLoading: initialState.isLoading,
            };
        }
        case CourseConstants.GET_COURSE_BY_ID_FAIL:
        case CourseConstants.UPDATE_COURSE_FAIL:
        case CourseConstants.CREATE_COURSE_FAIL:
        case CourseConstants.DELETE_COURSE_FAIL:
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
        case CourseConstants.CLEAR: {
            return {
                ...state,
                ...initialState,
            };
        }
        default:
            return {
                ...state,
            };
    }
}
