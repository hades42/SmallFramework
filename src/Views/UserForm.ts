import { User } from "../models/User";

export class UserForm {
    parent: Element;
    model: User;

    constructor(parent: Element, model: User) {
        this.parent = parent;
        this.model = model;
    }

    // return type is an object with key(string) and value : (void function)
    eventsMap(): { [key: string]: () => void } {
        return {
            "click:.set-age": this.onSetAgeClick,
        };
    }

    onButtonClick(): void {
        console.log("Hi There");
    }

    onHeaderHover(): void {
        console.log("change color");
    }

    onSetAgeClick(): void {
        console.log("On Set Age");
    }

    template(): string {
        return `
            <div>
                <h1>User Form</h1>
                <div>User name: ${this.model.get("name")}</div>
                <div>User age: ${this.model.get("age")}</div>
                <input />
                <button>Click Me</button>
                <button class="set-age">Set Random Age</button>
            </div>
    
        `;
    }

    bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();
        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(":");

            fragment.querySelectorAll(selector).forEach((element) => {
                element.addEventListener(eventName, eventsMap[eventKey]);
            });
        }
    }

    render(): void {
        const templateElement = document.createElement("template");
        templateElement.innerHTML = this.template();

        this.bindEvents(templateElement.content);

        this.parent.append(templateElement.content);
    }
}
