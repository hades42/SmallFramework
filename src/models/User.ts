import axios, { AxiosResponse } from "axios";
import { entryPoint } from "../index";
import { Eventing } from "./Eventing";

interface UserProps {
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

    // Set the information from db.json
    fetch(): void {
        axios
            .get(`${entryPoint}/users/${this.get("id")}`)
            .then((res: AxiosResponse): void => {
                this.set(res.data);
            });
    }

    // Save property again
    save(): void {
        const id = this.get("id");

        if (this.get("id")) {
            // put
            axios.put(`${entryPoint}/users/${id}`, this.data);
        } else {
            // post
            axios.post(`${entryPoint}/users`, this.data);
        }
    }
}
