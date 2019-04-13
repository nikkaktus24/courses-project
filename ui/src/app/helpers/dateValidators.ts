const REGEXP: RegExp = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/ig;

export function isDateValid(date: string): boolean {
    return REGEXP.test(date);
}