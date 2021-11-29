import { View } from "./View";
import { User, UserProps } from "../models/User";

export class UserShow extends View<User, UserProps> {
    eventsMap(): { [key: string]: () => void } {
        return {};
    }

    template(): string {
        return `
            <div>
                <h1><User Detail</h1> 
                <div>User name: ${this.model.get("name")}</div>
                <div>User age: ${this.model.get("age")}</div>
            </div>
        `;
    }
}
