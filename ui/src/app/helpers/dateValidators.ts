import * as moment from 'moment';

export function isDateValid(date: string): boolean {
    return moment(date, 'DD/MM/YYYY').isValid();
}