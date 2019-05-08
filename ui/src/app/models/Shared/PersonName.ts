import { IUserName } from './../../interfaces/Auth/UserName';
export class PersonName {
    public firstName: string;
    public lastName: string;

    constructor(model: IUserName) {
        this.firstName = model.first;
        this.lastName = model.last;
    }

    public getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}