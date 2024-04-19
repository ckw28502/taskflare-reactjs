import axiosInstance from "./axiosInstance";

const baseURL = "/projects"

async function getAllProjects() {
    return axiosInstance.get(baseURL)
        .then(response => response.data);
}

async function getDetailProjects(projectId) {
    return axiosInstance.get(`${baseURL}/${projectId}`)
        .then(response => response.data);
}

async function createProject(values) {
    return axiosInstance.post(baseURL, values)
        .then(response => response.data);
}

async function editProject(values) {
    return axiosInstance.put(baseURL, values);
    
}


export default {
    getAllProjects,
    getDetailProjects,
    createProject,
    editProject
};