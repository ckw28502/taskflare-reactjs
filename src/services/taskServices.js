import axiosInstance from "./axiosInstance"

const baseURL = "/tasks"

async function getAllTasks(projectId) {
    return axiosInstance.get(`${baseURL}/${projectId}`)
        .then(response => response.data);
}

async function createTask(values) {
    return axiosInstance.post(baseURL, values)
        .then(response => response.data);
}

export default {
    getAllTasks,
    createTask
};
