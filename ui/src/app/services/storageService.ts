export class StorageService {
    public static set<T>(key: string, value: T): void {
        if (value) {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.removeItem(key);
        }
    }

    public static get<T>(key: string): T {
        return JSON.parse(localStorage.getItem(key));
    }

    public static delete(key: string): void {
        localStorage.removeItem(key);
    }

    constructor() {}
}