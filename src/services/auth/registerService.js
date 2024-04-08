import axios from "axios";

async function register(request) {
    await axios.post(`${import.meta.env.VITE_SERVER_URI}/register`,request);
}

export default register;