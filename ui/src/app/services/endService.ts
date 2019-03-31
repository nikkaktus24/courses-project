import { appSettings } from './../../appSettings';
import { SortTypes } from '../enums/sort-types';

const BASE_URL: string = appSettings.apiLink;


export class EndService {

    public static login(): string {
        return `${BASE_URL}/auth/login`;
    }

    public static userData(): string {
        return `${BASE_URL}/auth/userinfo`;
    }

    public static createCourse(): string {
        return `${BASE_URL}/courses/course`;
    }

    public static courseById(id: string): string {
        return `${BASE_URL}/courses/${id}`;
    }

    public static getCourses(start: number, pageNumber: number, sort: SortTypes, textFragment?: string): string {
        const url: string = `${BASE_URL}/courses?start=${start}&pageNumber=${pageNumber}&sort=${sort}`;
        return textFragment ? url + `&textFragment=${textFragment}` : url;
    }

    constructor() {}
}