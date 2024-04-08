import axios from "axios";

async function login(request) {
    return axios.post(`${import.meta.env.VITE_SERVER_URI}/login`, request)
    .then(response => response.data);
}

export default login;