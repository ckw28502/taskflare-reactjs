import axiosInstance from "./axiosInstance"

const baseURL = "/positions";

async function addPosition(values) {
    return axiosInstance.post(baseURL, values);
}

async function removePosition(projectId) {
    return axiosInstance.delete(`${baseURL}/${projectId}`);
}

export default {
    addPosition,
    removePosition
}