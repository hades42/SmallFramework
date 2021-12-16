export const entryPoint = "http://localhost:3000/users";
import { UserList } from "./Views/UserList";
import { Collection } from "./models/Collection";
import { UserProps, User } from "./models/User";

const users = new Collection(entryPoint, (json: UserProps) => {
    return User.buildUser(json);
});

users.on("change", () => {
    const root = document.getElementById("root");

    if (root) {
        new UserList(root, users).render();
    }
});

users.fetch();
