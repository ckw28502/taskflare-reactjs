import { func } from "prop-types";
import { forwardRef } from "react";
import TaskForm from "../TaskForm";

const AddTask = forwardRef(function AddTask(props, ref) {
    const initialValues = {
        positionId: "",
        title: "",
        description: "",
        deadline: null
    }
    return (
        <TaskForm 
            ref={ref}
            initialValues={initialValues}
            onSubmit={async(values) => await props.handleSubmit(values)}
            title= "CREATE_TASK"
        />
    )
})

AddTask.propTypes = {
    handleSubmit: func.isRequired
}

export default AddTask;
