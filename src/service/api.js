import axios from "axios";
console.log();
const customAxios = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem("access-token"),
    }
})
export default customAxios;
