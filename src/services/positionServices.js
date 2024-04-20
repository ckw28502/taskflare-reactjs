import axiosInstance from "./axiosInstance"

const baseURL = "/positions";

async function addPosition(values) {
    return axiosInstance.post(baseURL, values);
}

export default {
    addPosition
}