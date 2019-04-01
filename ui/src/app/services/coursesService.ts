import { CourseApi } from './../api/coursesApi';
import { ICourseDTO } from './../interfaces/Courses/courses-dto';
import { CourseConstants } from './../store/constants/courses';
import { Course } from '../models/Courses/Courses';
import { SortTypes } from '../enums/sort-types';


export class CoursesService {

    public static clearErrors() {
        return {
            type: CourseConstants.CLEAR,
        };
    }

    public static fetchCourses(start: number, pageNumber: number, sort: SortTypes = SortTypes.Date, textFragment?: string) {
        return async (dispatch: any) => {
            dispatch({
                type: CourseConstants.FETCH_COURSES,
            });
            try {

                const response: ICourseDTO[] = await CourseApi.fetchCourses(start, pageNumber, sort, textFragment);
                const payload: Course[] = response.map((item: ICourseDTO) => Course.fromServer(item));

                dispatch({
                    type: CourseConstants.FETCH_COURSES_OK,
                    payload,
                });
            } catch (err) {
                dispatch({
                    type: CourseConstants.FETCH_COURSES_FAIL,
                    payload: err.response.data,
                });
            }
        };
    }

    public static createCourse(course: Course) {
        return async (dispatch: any) => {
            dispatch({
                type: CourseConstants.CREATE_COURSE,
            });
            try {

                dispatch({
                    type: CourseConstants.CREATE_COURSE_OK,
                });
            } catch (err) {
                dispatch({
                    type: CourseConstants.CREATE_COURSE_FAIL,
                    payload: err.response.data,
                });
            }
        };
    }


    public static getCourseById(id: number) {
        return async (dispatch: any) => {
            dispatch({
                type: CourseConstants.GET_COURSE_BY_ID,
            });
            try {

                dispatch({
                    type: CourseConstants.GET_COURSE_BY_ID_OK,
                });
            } catch (err) {
                dispatch({
                    type: CourseConstants.GET_COURSE_BY_ID_FAIL,
                    payload: err.response.data,
                });
            }
        };
    }


    public static updateCourse(course: Course) {
        return async (dispatch: any) => {
            dispatch({
                type: CourseConstants.UPDATE_COURSE,
            });
            try {

                dispatch({
                    type: CourseConstants.UPDATE_COURSE_OK,
                });
            } catch (err) {
                dispatch({
                    type: CourseConstants.UPDATE_COURSE_FAIL,
                    payload: err.response.data,
                });
            }
        };
    }


    public static deleteCourse(id: number) {
        return async (dispatch: any) => {
            dispatch({
                type: CourseConstants.DELETE_COURSE,
            });
            try {

                dispatch({
                    type: CourseConstants.DELETE_COURSE_OK,
                });
            } catch (err) {
                dispatch({
                    type: CourseConstants.DELETE_COURSE_FAIL,
                    payload: err.response.data,
                });
            }
        };
    }

    constructor() {}
}
