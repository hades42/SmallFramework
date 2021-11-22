import { AxiosPromise, AxiosResponse } from "axios";

interface ModelAttribute<T> {
    set(value: T): void;
    getAll(): T;
    get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
    fetch(id: number): AxiosPromise;
    save(data: T): AxiosPromise;
}

interface Events {
    on(eventName: string, callback: () => void): void;
    trigger(eventName: string): void;
}

interface HasId {
    id?: number;
}

export class Model<T extends HasId> {
    constructor(
        private attributes: ModelAttribute<T>,
        // Since we only have 1 set rule of event, so every new User will
        // have the same Eventing class. In the future, if we have more type
        // of event, we should use a composisiton pattern, by accepting Eventing
        // class as a paramater for constructor
        private events: Events,
        private sync: Sync<T>
    ) {}

    // Return the reference of the function
    get on() {
        return this.events.on;
    }

    // Return the reference of the function
    get trigger() {
        return this.events.trigger;
    }

    // Return the reference of the function
    get get() {
        return this.attributes.get.bind(this.attributes);
    }

    set(update: T): void {
        this.attributes.set(update);
        this.events.trigger("change");
    }

    fetch(): void {
        const id = this.get("id");

        if (typeof id !== "number") {
            throw new Error("Cannot fetch without an id");
        }

        this.sync.fetch(id).then((res: AxiosResponse): void => {
            this.set(res.data);
        });
    }

    save(): void {
        this.sync
            .save(this.attributes.getAll())
            .then((res: AxiosResponse): void => {
                this.trigger("save");
            })
            .catch(() => {
                this.trigger("error");
            });
    }
}
