import axiosInstance from "./axiosInstance";

const baseURL = "/projects"

async function createProject(values) {
    return axiosInstance.post(baseURL, values)
        .then(response => response.data);
}

export default {
    createProject
};