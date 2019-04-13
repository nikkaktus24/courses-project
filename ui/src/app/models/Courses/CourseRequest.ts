import * as moment from 'moment';
import { ICourseForm } from '../../interfaces/Courses/course-form';

export class CourseCreateRequest {
    public name: string;
    public date: string;
    public length: number;
    public description: string;
    public cost: number;
    public isTopRated: boolean;

    public static toRequest(form: ICourseForm): CourseCreateRequest {
        if (!form) {
            return null;
        }

        const course: CourseCreateRequest = new CourseCreateRequest();

        course.name = form.name;
        course.date = moment(form.date, 'DD/MM/YYYY').format();
        course.length = form.length;
        course.description = form.description;
        course.cost = form.cost;
        course.isTopRated = form.isTopRated;

        return course;
    }

    constructor() {}
}