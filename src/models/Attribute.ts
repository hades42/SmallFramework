import { UserProps } from "./User";
export class Attribute<T> {
    private data: T;
    constructor(data: T) {
        this.data = data;
    }

    get<K extends keyof T>(key: K): T[K] {
        return this.data[key];
    }

    set(update: T): void {
        this.data = { ...this.data, ...update };
    }

    getAll = (): T => {
        return this.data;
    };
}
