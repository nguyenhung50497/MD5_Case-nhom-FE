import axios from "axios";
console.log();
const customAxios = axios.create({
    baseURL: 'http://localhost:8000/'
})
export default customAxios;
