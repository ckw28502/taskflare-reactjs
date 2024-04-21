const setProjectAction = projectData => ({
    type: "SET_PROJECT",
    payload: projectData
});

const removeProjectAction = () => ({
    type: "REMOVE_PROJECT"
});

export default {
    setProjectAction,
    removeProjectAction
};