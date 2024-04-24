import axiosInstance from "./axiosInstance"

const baseURL = "/positions";

async function getAllPosition(projectId) {
    return axiosInstance.get(`${baseURL}/${projectId}`)
        .then(response => response.data);
}

async function addPosition(values) {
    return axiosInstance.post(baseURL, values);
}

async function removePosition(projectId) {
    return axiosInstance.delete(`${baseURL}/${projectId}`);
}

export default {
    getAllPosition,
    addPosition,
    removePosition
}