import { IEntityDTO } from './../Shared/entity-dto';

export interface ICourseDTO extends IEntityDTO<string> {
    date: string;
    length: number;
    cost: number;
    description: string;
    isTopRated: boolean;
}