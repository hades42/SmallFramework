interface UserProps {
    name: string;
    age: number;
}

export class User {
    private data: UserProps;
    constructor(data: UserProps) {
        this.data = data;
    }

    get(propName: string): number | string {
        return this.data[propName];
    }
}
