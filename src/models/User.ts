import axios, { AxiosResponse } from "axios";
import { entryPoint } from "../index";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { Attribute } from "./Attribute";
import { Model } from "./Model";

export interface UserProps {
    // "?" means that this interface can have these propreties,
    // but it is stil fine if it doesnt have them

    id?: number;
    name?: string;
    age?: number;
}

export class User extends Model<UserProps> {
    static buildUser(attrs: UserProps): User {
        return new User(
            new Attribute<UserProps>(attrs),
            new Eventing(),
            new Sync<UserProps>(entryPoint)
        );
    }
}
