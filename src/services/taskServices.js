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

async function changeTaskStatus(values) {
    return axiosInstance.patch(baseURL, values);
}

async function editTask(values) {
    return axiosInstance.put(baseURL, values)
        .then(response => response.data);
}

async function deleteTask(taskId) {
    return axiosInstance.delete(`${baseURL}/${taskId}`);
}

export default {
    getAllTasks,
    createTask,
    changeTaskStatus,
    editTask,
    deleteTask
};
