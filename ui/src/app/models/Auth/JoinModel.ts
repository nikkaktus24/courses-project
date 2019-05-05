import { SessionModel } from './SessionModel';

export class JoinModel extends SessionModel {
    public firstName: string;
    public lastName: string;

    constructor() {
        super();
    }
}