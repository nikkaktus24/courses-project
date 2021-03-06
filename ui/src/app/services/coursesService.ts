import { IUserData } from './../interfaces/Auth/UserDataDTO';
import { UserData } from './../models/Shared/UserData';
import { UserConstants } from './../store/constants/user';
import { OrderCoursesRequest } from './../interfaces/Courses/order-courses-request';
import { CourseCreateRequest } from './../models/Courses/CourseRequest';
import { CourseApi } from './../api/coursesApi';
import { ICourseDTO } from './../interfaces/Courses/courses-dto';
import { CourseConstants } from './../store/constants/courses';
import { Course } from '../models/Courses/Courses';
import { SortTypes } from '../enums/sort-types';
import getError from '../helpers/getError';

const COURSE_COUNT: number = 8;

export class CoursesService {

    public static clearErrors() {
        return {
            type: CourseConstants.CLEAR,
        };
    }

    public static store(store: Course[]) {
        return {
            type: CourseConstants.STORE_WORK,
            payload: store,
        };
    }

    public static fetchCourses(start: number, pageNumber: number, sort: SortTypes = SortTypes.Date, textFragment?: string, filter?: SortTypes,) {
        return async (dispatch: any) => {
            dispatch({
                type: CourseConstants.FETCH_COURSES,
            });
            try {

                const response: ICourseDTO[] = await CourseApi.fetchCourses(start, pageNumber * COURSE_COUNT, sort, textFragment, filter);
                const payload: Course[] = response.map((item: ICourseDTO) => Course.fromServer(item));

                dispatch({
                    type: CourseConstants.FETCH_COURSES_OK,
                    payload,
                });
            } catch (err) {
                dispatch({
                    type: CourseConstants.FETCH_COURSES_FAIL,
                    payload: getError(err),
                });
            }
        };
    }

    public static fetchCoursesByUserId(userId: number, start: number, pageNumber: number, sort: SortTypes = SortTypes.Date, textFragment?: string, filter?: SortTypes,) {
        return async (dispatch: any) => {
            dispatch({
                type: CourseConstants.FETCH_COURSES,
            });
            try {

                const response: ICourseDTO[] = await CourseApi.fetchCoursesByUserId(userId, start, pageNumber * COURSE_COUNT, sort, textFragment, filter);
                const payload: Course[] = response.map((item: ICourseDTO) => Course.fromServer(item));

                dispatch({
                    type: CourseConstants.FETCH_COURSES_OK,
                    payload,
                });
            } catch (err) {
                dispatch({
                    type: CourseConstants.FETCH_COURSES_FAIL,
                    payload: getError(err),
                });
            }
        };
    }

    public static createCourse(course: CourseCreateRequest) {
        return async (dispatch: any) => {
            dispatch({
                type: CourseConstants.CREATE_COURSE,
            });
            try {
                const response: ICourseDTO = await CourseApi.createCourse(course);
                const payload: Course = Course.fromServer(response);

                dispatch({
                    type: CourseConstants.CREATE_COURSE_OK,
                    payload
                });
            } catch (err) {
                dispatch({
                    type: CourseConstants.CREATE_COURSE_FAIL,
                    payload: getError(err),
                });
            }
        };
    }

    public static orderCourses(request: OrderCoursesRequest) {
        return async (dispatch: any) => {
            dispatch({
                type: CourseConstants.ORDER_COURSES,
            });
            try {
                const result: IUserData = await CourseApi.orderCourses(request);
                const payload: UserData = UserData.fromDTO(result);

                dispatch({
                    type: UserConstants.FETCH_USER_OK,
                    payload,
                });
            } catch (err) {
                dispatch({
                    type: CourseConstants.ORDER_COURSES_FAIL,
                    payload: getError(err),
                });
            }
        };
    }

    public static resetCourses() {
        return async (dispatch: any) => {
            dispatch({
                type: CourseConstants.RESET_COURSES,
            });
            try {
                await CourseApi.resetCourses();

                dispatch({
                    type: CourseConstants.RESET_COURSES_OK,
                });
            } catch (err) {
                dispatch({
                    type: CourseConstants.RESET_COURSES_FAIL,
                    payload: getError(err),
                });
            }
        };
    }

    public static getCourseById(id: string) {
        return async (dispatch: any) => {
            dispatch({
                type: CourseConstants.GET_COURSE_BY_ID,
            });
            try {
                const response: ICourseDTO = await CourseApi.getCourseById(id);
                const payload: Course = Course.fromServer(response);

                dispatch({
                    type: CourseConstants.GET_COURSE_BY_ID_OK,
                    payload,
                });
            } catch (err) {
                dispatch({
                    type: CourseConstants.GET_COURSE_BY_ID_FAIL,
                    payload: getError(err),
                });
            }
        };
    }


    public static updateCourse(id: string, course: CourseCreateRequest) {
        return async (dispatch: any) => {
            dispatch({
                type: CourseConstants.UPDATE_COURSE,
            });
            try {
                const response: ICourseDTO = await CourseApi.updateCourse(id, course);
                const payload: Course = Course.fromServer(response);

                dispatch({
                    type: CourseConstants.UPDATE_COURSE_OK,
                    payload,
                });
            } catch (err) {
                dispatch({
                    type: CourseConstants.UPDATE_COURSE_FAIL,
                    payload: getError(err),
                });
            }
        };
    }


    public static deleteCourse(id: string) {
        return async (dispatch: any) => {
            dispatch({
                type: CourseConstants.DELETE_COURSE,
            });
            try {
                await CourseApi.deleteCourse(id);

                dispatch({
                    type: CourseConstants.DELETE_COURSE_OK,
                });
            } catch (err) {
                dispatch({
                    type: CourseConstants.DELETE_COURSE_FAIL,
                    payload: getError(err),
                });
            }
        };
    }

    constructor() {}
}
