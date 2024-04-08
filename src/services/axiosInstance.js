import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URI;

const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.request.use(async(config) => {
    const token = sessionStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, async(error) => Promise.reject(error));

axiosInstance.interceptors.response.use(response => response, async(error) => {
    const request = error.config;

    if (error.response.status === 401 && !request._retry) {
        request._retry = true;

        const refreshToken = sessionStorage.getItem("refreshToken");
        if (!refreshToken) {
            throw error;
        }

        return await axios.post(`${baseURL}/refresh`, {}, {
            headers: { Authorization: `Bearer ${refreshToken}` }
        }).then(response => {
            const newToken = response.data.token;
            
            sessionStorage.setItem("token", newToken);

            request.headers.Authorization = `Bearer ${newToken}`;

            return axiosInstance(request);
        }).catch(async(refreshTokenError) => Promise.reject(refreshTokenError))
    }

    return Promise.reject(error);
})

export default axiosInstance;