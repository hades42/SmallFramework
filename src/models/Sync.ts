import axios, { AxiosResponse, AxiosPromise } from "axios";
import { entryPoint } from "..";

// Provide interface for generic
// Firstly, to make sure that the data of generic type
// have "id" property.
// Secondly to make sure that the any generic data
// must have "id" (following the rule of interface).
interface HasId {
    id?: number;
}

export class Sync<T extends HasId> {
    public rootUrl: string;

    constructor(rootUrl: string) {
        this.rootUrl = rootUrl;
    }

    // Set the information from db.json
    fetch(id: number): AxiosPromise {
        return axios.get(`${this.rootUrl}/users/${id}`);
    }

    // Save property again
    save(data: T): AxiosPromise {
        const { id } = data;

        if (id) {
            // put
            return axios.put(`${this.rootUrl}/users/${id}`, data);
        } else {
            // post
            return axios.post(`${this.rootUrl}/users`, data);
        }
    }
}
