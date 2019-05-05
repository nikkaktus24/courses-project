export class OrderCoursesRequest {
    public userId: number;
    public courses: string[];
    public cost: number;

    constructor(userId: number, courses: string[], cost: number) {
        this.userId = userId;
        this.courses = [...courses];
        this.cost = cost;
    }
}