import { View } from "./View";
import { UserProps, User } from "../models/User";
import { UserForm } from "./UserForm";
import { UserShow } from "./UserShow";

export class UserEdit extends View<User, UserProps> {
    eventsMap(): { [key: string]: () => void } {
        return {};
    }

    regionsMap(): { [key: string]: string } {
        return {
            userShow: ".user-show",
            userForm: ".user-form",
        };
    }

    onRender(): void {
        const usershow = new UserShow(this.regions.userShow, this.model);
        usershow.render();

        const userForm = new UserForm(this.regions.userForm, this.model);
        userForm.render();
    }

    template(): string {
        return `
        <div>
            <div class="user-show"></div>
            <div class="user-form"></div>
        </div>
        `;
    }
}
