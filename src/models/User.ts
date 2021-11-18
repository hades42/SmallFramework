import axios, { AxiosResponse } from "axios";
import { entryPoint } from "../index";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";

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

    private data: UserProps;

    constructor(data: UserProps) {
        this.data = data;
    }

    get(propName: string): number | string {
        return this.data[propName];
    }

    set(update: UserProps): void {
        this.data = { ...this.data, ...update };
    }
}
