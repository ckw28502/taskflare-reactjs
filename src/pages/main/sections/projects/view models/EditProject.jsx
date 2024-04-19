import { forwardRef } from "react";
import ProjectForm from "../../ProjectForm";
import { func, object } from "prop-types";

const EditProject = forwardRef(function EditProject(props, ref) {
    
    const initialValues = {
        title: props.project.getTitle(),
        description: props.project.getDescription(),
        deadline: props.project.getDeadline()
    };

    async function handleSubmit(values) {
        values.projectId = props.project.getId();
        await props.onSubmit(values);
    }

    return(
        <ProjectForm 
            ref={ref} 
            initialValues={initialValues} 
            onSubmit={async(values) =>  await handleSubmit(values)} 
            title="EDIT_PROJECT" 
        />
    )
})

EditProject.propTypes = { 
    project: object.isRequired,
    onSubmit: func.isRequired
 }

export default EditProject;