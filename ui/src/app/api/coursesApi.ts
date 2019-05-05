import { IUserData } from './../interfaces/Auth/UserDataDTO';
import { OrderCoursesRequest } from './../interfaces/Courses/order-courses-request';
import { CourseCreateRequest } from './../models/Courses/CourseRequest';
import { SortTypes } from './../enums/sort-types';
import { ICourseDTO } from './../interfaces/Courses/courses-dto';
import { EndService } from './../services/endService';
import axios from 'axios';
import getResponse from '../helpers/getResponse';
import { Course } from '../models/Courses/Courses';

export class CourseApi {
    public static async fetchCourses(start: number, pageNumber: number, sort: SortTypes, textFragment?: string, filter?: SortTypes,): Promise<ICourseDTO[]> {
        return getResponse(axios.get<ICourseDTO[]>(EndService.getCourses(start, pageNumber, sort, textFragment, filter)));
    }

    public static async fetchCoursesByUserId(userId: number, start: number, pageNumber: number, sort: SortTypes, textFragment?: string, filter?: SortTypes,): Promise<ICourseDTO[]> {
        return getResponse(axios.get<ICourseDTO[]>(EndService.getCoursesByUserId(userId, start, pageNumber, sort, textFragment, filter)));
    }

    public static async createCourse(course: CourseCreateRequest): Promise<ICourseDTO> {
        return getResponse(axios.post<ICourseDTO>(EndService.createCourse(), course));
    }

    public static async orderCourses(request: OrderCoursesRequest): Promise<IUserData> {
        return getResponse(axios.post<IUserData>(EndService.orderCourses(), request));
    }

    public static async getCourseById(id: string): Promise<ICourseDTO> {
        return getResponse(axios.get<ICourseDTO>(EndService.courseById(id)));
    }

    public static async updateCourse(id: string, course: CourseCreateRequest): Promise<ICourseDTO> {
        return getResponse(axios.patch<ICourseDTO>(EndService.courseById(id), course));
    }

    public static async deleteCourse(id: string): Promise<void> {
        return getResponse(axios.delete(EndService.courseById(id)));
    }

    constructor() {}
}
