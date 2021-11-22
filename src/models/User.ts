import axios, { AxiosResponse } from "axios";
import { entryPoint } from "../index";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { Attribute } from "./Attribute";

export interface UserProps {
    // "?" means that this interface can have these propreties,
    // but it is stil fine if it doesnt have them

    id?: number;
    name?: string;
    age?: number;
}

export class User {
    // Since we only have 1 set rule of event, so every new User will
    // have the same Eventing class. In the future, if we have more type
    // of event, we should use a composisiton pattern, by accepting Eventing
    // class as a paramater for constructor
    public events: Eventing = new Eventing();
    public sync: Sync<UserProps> = new Sync<UserProps>(entryPoint);
    public attributes: Attribute<UserProps>;

    constructor(attrs: UserProps) {
        this.attributes = new Attribute<UserProps>(attrs);
    }

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

    set(update: UserProps): void {
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
