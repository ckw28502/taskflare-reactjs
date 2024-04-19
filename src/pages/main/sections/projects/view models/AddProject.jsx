import { forwardRef } from "react";
import ProjectForm from "../../ProjectForm";
import projectServices from "../../../../../services/projectServices";
import { useNavigate } from "react-router-dom";

const AddProject = forwardRef(function AddProject() {
    const navigate = useNavigate();
    
    const initialValues = {
        title: "",
        description: "",
        deadline: null
    };

    async function addProject(values) {
        const request = {
            title: values.title,
            description: values.description
        };

        if (values.deadline) {
            request.deadline = values.deadline;
        }

        const newProjectId = await projectServices.createProject(request)
            .then(data => data.projectId);

        navigate(`/${newProjectId}`);
    }

    return(
        <ProjectForm initialValues={initialValues} onSubmit={addProject} title="CREATE_PROJECT"/>
    )
})

export default AddProject;