import { UserProps } from "./User";
export class Attribute<T> {
    constructor(private data: T) {}

    get<K extends keyof T>(key: K): T[K] {
        return this.data[key];
    }

    set(update: T): void {
        this.data = { ...this.data, ...update };
    }
}

const attrs = new Attribute<UserProps>({
    id: 5,
    name: "Ahihi",
    age: 21,
});

attrs.get("name");
