import { User } from "./models/User";
import axios from "axios";

const entryPoint = "http://localhost:3000";

axios
    .get(`${entryPoint}/users/1`, {})
    .then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        console.log(error);
    });
