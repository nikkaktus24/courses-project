import { IEntityDTO } from './../../interfaces/Shared/entity-dto';
import { ICourseDTO } from './../../interfaces/Courses/courses-dto';
import { Entity } from '../Shared/Entity';
import * as moment from 'moment';

export class Course {
    public id: string;
    public name: string;
    public date: moment.Moment;
    public length: number;
    public description: string;
    public cost: number;
    public authors: Entity<string>[];
    public isTopRated: boolean;

    public static fromServer(response: ICourseDTO): Course {
        if (!response) {
            return null;
        }

        const course: Course = new Course();

        course.id = response.id;
        course.name = response.name;
        course.date = moment(response.date);
        course.length = response.length;
        course.description = response.description;
        course.cost = response.cost;
        course.isTopRated = response.isTopRated;

        return course;
    }

    constructor() {}
}