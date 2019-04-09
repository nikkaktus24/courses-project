import { Entity } from './../models/Shared/Entity';
import { SortTypes } from '../enums/sort-types';

export const courseOptions: Entity<SortTypes>[] = [
    new Entity<SortTypes>(SortTypes.Id, 'Ид'),
    new Entity<SortTypes>(SortTypes.Name, 'Имя'),
    new Entity<SortTypes>(SortTypes.Date, 'Дата'),
    new Entity<SortTypes>(SortTypes.Description, 'Описание'),
    new Entity<SortTypes>(SortTypes.isTopRated, 'Сначала популярные'),
    new Entity<SortTypes>(SortTypes.Length, 'Длина'),
];