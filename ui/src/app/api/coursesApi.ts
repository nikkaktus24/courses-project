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

    public static async createCourse(course: Course): Promise<ICourseDTO> {
        return getResponse(axios.post<ICourseDTO>(EndService.createCourse(), course));
    }

    public static async getCourseById(id: string): Promise<ICourseDTO> {
        return getResponse(axios.get<ICourseDTO>(EndService.courseById(id)));
    }

    public static async updateCourse(course: Course): Promise<ICourseDTO> {
        return getResponse(axios.patch<ICourseDTO>(EndService.courseById(course.id), course));
    }

    public static async deleteCourse(id: string): Promise<void> {
        return getResponse(axios.delete(EndService.courseById(id)));
    }

    constructor() {}
}
